'use client'

import { useState } from 'react'
import { searchAtom } from '@/atoms'
import { useAtom } from 'jotai'

import { Button } from './ui/button'
import { Input } from './ui/input'

export default function Search() {
  const [searchText, setSearchText] = useState('')
  const [query, setQuery] = useAtom(searchAtom)

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setQuery(searchText)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto mb-8 flex w-full max-w-sm items-center space-x-2"
    >
      <Input
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        placeholder="search image"
      />
      <Button type="submit">Search</Button>
    </form>
  )
}
