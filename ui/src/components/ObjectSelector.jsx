export default ({
  options = {},
  onChange = () => null,
  value = '',
  label = 'Please select...',
  disabled
}) => (
  <select
    onChange={e => onChange(parseInt(e.target.value))}
    value={value}
    disabled={disabled || !Object.keys(options).length}
  >
    <option>{label}</option>
    {Object.entries(options).map(([id, { name }]) => (
      <option key={id} value={id}>
        {name}
      </option>
    ))}
  </select>
)
