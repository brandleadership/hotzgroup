<script>
import { gsap } from 'gsap'
import { find, hasClass, isTouchDevice } from '~/scripts/elements.js'

export default {
  props: ['sbData', 'page', 'type'],
  computed: {
    url: function() {
      if (!this.sbData) return ''

      if (this.sbData.cached_url) return this.sbData.cached_url
      else return this.sbData.full_slug
    },
    link: function() {
      if (this.isExternal) {
        // external links
        return this.url
      } else {
        if (!this.sbData) {
          return ''
        }
        if (this.url == '/') return this.url
        else return '/' + this.url
      }
    },
    isFile: function() {
      const url = this.url
      if (url === undefined) return false
      const match = url.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)

      if (match && match[1] && (match[1].toLowerCase() == 'html' || match[1].toLowerCase() == 'htm')) return false

      if (match && match[1]) return true
      else return false
    },
    isExternal: function() {
      const url = this.url
      if (url === undefined) return false
      const match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/)

      if (typeof match[1] === 'string' && match[1].length > 0) return true
      if (typeof match[2] === 'string' && match[2].length > 0) {
        return true
      }

      return false
    },
    isActive: function() {
      let storeLevels = this.$store.state.menuLevels

      if (storeLevels !== undefined) {
        for (var i = 0; i < storeLevels.length; i++) {
          if (this.link == '/' + storeLevels[i].full_slug) {
            return true
          }
        }
      }
      return false
    },
  },
  methods: {
    onNuxtlinkClicked: function(e) {
      this.$emit('click')
      e.preventDefault()
    },
    onLinkClick: function(e) {
      this.$emit('click')
      //alert('asdfsdfasdf')
    },
  },
  created: function() {
    if (this.isExternal && !this.isFile) {
      this.$emit('update:type', 'external')
    } else if (this.isFile) {
      this.$emit('update:type', 'download')
    } else {
      this.$emit('update:type', 'default')
    }
  },
}
</script>

<template>
  <div class="link-container">
    <nuxt-link
      :class="{'sblink-active':isActive}"
      v-on:click.native="onNuxtlinkClicked"
      v-if="!isExternal"
      :to="link"
    >
      <slot></slot>
    </nuxt-link>
    <a
      v-if="isExternal && !isFile"
      class="external-link"
      :download="link"
      @click="onLinkClick"
      :href="link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <slot></slot>
    </a>
    <a
      v-if="isFile"
      @click="onLinkClick"
      class="download-link"
      :download="link"
      :href="link"
      target="_blank"
    >
      <slot></slot>
    </a>
  </div>
</template>
