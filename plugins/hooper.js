import {
  Hooper,
  Slide
} from 'hooper'

import 'hooper/dist/hooper.css'

export default ({
  app
}) => {
  ;
  (function () {
    window.Hooper = Hooper
    window.Slide = Slide
  })()
}
