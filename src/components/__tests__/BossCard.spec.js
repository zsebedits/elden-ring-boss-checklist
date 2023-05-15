import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useI18n } from 'vue-i18n'
import BossCard from '../BossCard.vue'

vi.mock('vue-i18n')

useI18n.mockReturnValue({
  t: (tKey) => tKey
})

const boss = {
  id: '292b242a-6580-403f-a265-024e80f4636d',
  description: 'Starscourge Radahn',
  url: 'https://eldenring.wiki.fextralife.com/Starscourge+Radahn',
  image: 'https://eldenring.fanapis.com/images/bosses/17f69dc74fdl0i1v1wz3qrzn19aps8.png',
  health: 9572,
  stance: 200,
  runes: 70000,
  drops: ['Remembrance of the Starscourge', "Radahn's Great Rune"],
  remembrance: true,
  shardbearer: true,
  location: {
    id: '292b242a-6580-403f-a265-024e8024636d',
    name: 'Caelid'
  }
}

describe('BossCard', () => {
  it('renders properly', () => {
    const wrapper = mount(BossCard, { props: { boss } })
    expect(wrapper.text()).toContain(boss.description)
  })
})
