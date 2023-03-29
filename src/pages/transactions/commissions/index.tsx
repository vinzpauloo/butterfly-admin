import React from 'react'

import TabLists from '@/pages/transactions/components/TabLists'
import Container from '@/pages/transactions//components/Container'

type Props = {}

function index({}: Props) {
  return (
    <Container>
      <TabLists />
    </Container>
  )
}

export default index
