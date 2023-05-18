import React from 'react'

export const useGreeting = () => {
  const ShowGreeting = () => {
    const [greeting, setGreeting] = React.useState('')

    React.useEffect(() => {
      const hour = new Date().getHours()

      if (hour < 12) {
        setGreeting('Good Morning')
      } else if (hour < 17) {
        setGreeting('Good Afternoon')
      } else {
        setGreeting('Good Evening')
      }
    }, [])

    return greeting
  }

  return { ShowGreeting }
}
