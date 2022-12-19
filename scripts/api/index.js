import {
  async
} from 'q'
import StoryblokClient from 'storyblok-js-client'
import {
  slugify
} from '../utils'
import {
  maxHeaderSize
} from 'http'
const version = 'draft'
const fs = process.server ? require('fs-extra') : null
// const csv = process.server ? require('csv-parser') : null
const path = process.server ? require('path') : null
const crypto = process.server ? require('crypto') : null
//const fs = require('fs')
//import { fs } from 'fs'

const SBApi = ({
  app,
  isDev,
  query
}) => {
  // resolve this relations on the serverside
  const resolveRelationFields = ['GalleryOverviewItem.related_gallery', 'Home.featured_project']

  const cache_path = 'api_cache/'

  let version = isDev ? 'draft' : 'published'

  const clearCache = () => {
    fs.readdir(cache_path, (err, files) => {
      if (err) throw err

      for (const file of files) {
        fs.unlink(path.join(cache_path, file), err => {
          if (err) throw err
        })
      }
    })
  }

  const getFromCache = (prefix, params) => {
    let cache_filename = ''

    if (process.server) {
      //if (process.env.APP_ENV !== 'production') return false

      let cache_filename =
        cache_path +
        prefix.toLowerCase() +
        '_' +
        crypto
        .createHash('md5')
        .update(JSON.stringify(params))
        .digest('hex') +
        '.json'

      if (!fs.existsSync(cache_path)) {
        // Do something
        fs.mkdirSync(cache_path, '0744')
      }

      if (fs.existsSync(cache_filename)) {
        return fs.readJSONSync(cache_filename)
      }
    } else {
      return false
    }
  }

  const writeToCache = (prefix, params, data) => {
    if (process.server) {
      let cache_filename =
        cache_path +
        prefix.toLowerCase() +
        '_' +
        crypto
        .createHash('md5')
        .update(JSON.stringify(params))
        .digest('hex') +
        '.json'

      if (!fs.existsSync(cache_filename)) {
        fs.writeJson(cache_filename, data)
      }
    }
  }

  const getPage = (slug, no_cache) => {
    // let version = isDev ? 'draft' : 'published'

    if (slug === '/') {
      slug = 'home'
    }

    const params = {
      version: version,
      resolve_relations: resolveRelationFields.join(','),
    }

    const cache_params = {
      ...params,
      ...{
        slug: slug,
      },
    }

    const data = getFromCache('getPage', cache_params)

    // if (data && no_cache != undefined && no_cache == false) return data

    let url = 'cdn/stories' + slug + (no_cache ? '?r=' + Math.random() : '')

    return app.$storyapi
      .get(url, params)
      .then(res => {
        // console.log(version, slug, res.data.story)

        if (!no_cache) writeToCache('getPage', cache_params, res.data.story)

        return {
          ...res.data.story,
        }
      })
      .catch(res => {
        console.log('AN ERROR Acoured getPage ' + slug)
      })
  }

  const loadSettings = () => {
    return app.$storyapi
      .get(`cdn/stories/settings`, {
        version: version,
      })
      .then(res => {
        let story = res.data.story.content
        return {
          ...story,
        }
      })
      .catch(res => {
        console.log('AN ERROR loadSettings', res.data)
      })
  }


  const getEntriesBy = (componentname, page_num) => {

    return app.$storyapi
      .get(`cdn/stories?filter_query[component][in]=` + componentname, {
        version: version,
        per_page: 100,
        page: page_num,
      })
      .then(res => {
        return {
          ...res.data.stories,
        }
      })
      .catch(res => {
        console.log('AN ERROR loadSettings', res.data)
      })
  }

  return {
    clearCache,
    getPage,
    loadSettings,
    getEntriesBy,
  }
}

export default SBApi
