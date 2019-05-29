import SmoothLink from './SmoothLink'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import STRUCTURE from '../content/structure'
import _ from 'lodash'
import NavIconSet from './NavIconSet'

export default function SidebarNav({ postName, meta }) {
  if (_.isEmpty(meta)) {
    // topic page
    return null
  }
  let topics = []
  if (meta.series) {
    let postsInSeries = _(STRUCTURE)
      .toPairs()
      .filter(([_name, postMeta]) => postMeta.series === meta.series)
      .sortBy(([_name, postMeta]) => postMeta.date)
      .map(([name, _postMeta]) => name)
      .value()
    let currentPostIdx = _.findIndex(postsInSeries, p => p === postName)
    topics.push({
      name: 'series',
      href: `/${meta.series}`,
      prev: postsInSeries[currentPostIdx - 1],
      next: postsInSeries[currentPostIdx + 1],
    })
  }
  ;(meta.tags || []).forEach(tag => {
    let postsWithTag = _(STRUCTURE)
      .toPairs()
      .filter(([_name, postMeta]) => _.includes(postMeta.tags, tag))
      .sortBy(([_name, postMeta]) => postMeta.date)
      .map(([name, _postMeta]) => name)
      .value()
    let currentPostIdx = _.findIndex(postsWithTag, p => p === postName)
    topics.push({
      name: `#${tag}`,
      href: `/${tag}`,
      prev: postsWithTag[currentPostIdx - 1],
      next: postsWithTag[currentPostIdx + 1],
    })
  })

  return (
    <div className="sidebar-nav">
      <div className="sidebar-nav-box">
        <div className="sidebar-nav-logo" />
        <div className="sidebar-nav-byline">by Alex Zirbel</div>
        <NavIconSet />
      </div>
      {topics.map(topic => (
        <div key={topic.name} className="sidebar-nav-topic">
          <SmoothLink href={topic.prev} className="sidebar-nav-topic-button">
            <MdChevronLeft size="24px" />
          </SmoothLink>
          <SmoothLink href={topic.href} className="sidebar-nav-topic-text">
            {topic.name}
          </SmoothLink>
          <SmoothLink href={topic.next} className="sidebar-nav-topic-button">
            <MdChevronRight size="24px" />
          </SmoothLink>
        </div>
      ))}
    </div>
  )
}
