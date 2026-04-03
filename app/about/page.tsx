import AboutHero from '@/components/about/AboutHero'
import AboutQuoteSection from '@/components/about/AboutQuoteSection'
import Mission from '@/components/about/Mission'
import StatsCTASection from '@/components/about/StatsCTASection'
import TeamSection from '@/components/about/TeamSection'
import React from 'react'

export default function about() {
  return (
<>
<AboutHero/>
<TeamSection/>
<AboutQuoteSection/>
<Mission/>
<StatsCTASection/>

</>
  )
}
