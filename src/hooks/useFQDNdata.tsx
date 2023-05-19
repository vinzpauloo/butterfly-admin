interface FQDNProps {
  api: []
  photo: []
  streaming: []
}

export const useFQDNdata = () => {
  const formatFQDNdata = (data: FQDNProps) => {
    const normalizedData: { [key: string]: Array<{ value: string }> } = {
      api: [],
      photo: [],
      streaming: []
    }

    Object.keys(data).forEach(key => {
      const lowerKey = key.toLowerCase()
      if (normalizedData[lowerKey] !== undefined) {
        normalizedData[lowerKey] = normalizedData[lowerKey].concat(
          data[key as keyof FQDNProps].map(value => ({ value }))
        )
      }
    })

    return normalizedData
  }

  return {
    formatFQDNdata
  }
}
