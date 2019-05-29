import NavIconSet from './NavIconSet'

export default function Header() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 20,
      }}
    >
      <div>Z</div>
      <NavIconSet />
    </div>
  )
}
