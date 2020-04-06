import SmoothLink from '../components/SmoothLink'
import STRUCTURE from '../content/structure'

export default ({ postSlug }) => {
  return (
    <div>
      <SmoothLink key={postSlug} href={postSlug}>
        {/* <img width={80} src={STRUCTURE[postSlug].banner} /> */}
        {STRUCTURE[postSlug].title}
      </SmoothLink>
    </div>
  )
}
