import React from 'react'
import AudioPlayer from '../../../components/User/Podcast/AudioPlayer/AudioPlayer'
import PodcastItem from '../../../components/User/Podcast/PodcastItem/PodcastItem'
import PodcastList from '../../../components/User/Podcast/PodcastList/PodcastList'
import PodcastOpened from '../../../components/User/Podcast/PodcastOpened/PodcastOpened'

function Podcast() {
  return (
    <div>
      <h1>
        Podcast
      </h1>
      <div className='container'>
        <PodcastList/>
        <PodcastOpened 
          title="Daily Gratitude : how feeling grateful for what you already have can help you achieve much more"
          text="Life is a series of natural and spontaneous changes. Don't resist them; that only creates sorrow. Let reality be reality. Let things flow naturally forward in whatever way they like. A journey of a thousand miles must begin with a single step. Sometimes the questions are complicated, and the answers are simple. It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change."
          translation="La vie est une série de changements naturels et spontanés. Ne les résistez pas; cela ne crée que du chagrin. Laissez la réalité être la réalité. Laissez les choses couler naturellement dans n'importe quelle direction qu'elles aiment. Un voyage de mille lieues doit commencer par un seul pas. Parfois, les questions sont compliquées, et les réponses sont simples. Ce n'est pas le plus fort de l'espèce qui survit, ni le plus intelligent, mais celui qui réagit le mieux au changement."
        />
      </div>
    </div>
  )
}

export default Podcast