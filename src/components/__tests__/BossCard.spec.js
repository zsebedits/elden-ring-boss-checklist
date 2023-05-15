import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BossCard from '../BossCard.vue'
import boss from './fixtures/boss'

describe('BossCard.vue Implementation Test', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(BossCard, { props: { boss } })
    expect(wrapper.text()).toContain(boss.description)
    expect(wrapper.text()).toContain(boss.location.name)
    expect(wrapper.findAll('img').length).toEqual(1)
    expect(wrapper.findAll('img').at(0).attributes('src')).toMatch(boss.image)
  })

  it('does not show details if property "showDetails" is false', () => {
    const wrapper = shallowMount(BossCard, { props: { boss, showDetails: false } })
    expect(wrapper.text()).not.toContain(boss.location.name)
  })

  it('does not show the name if property "showName" is false', () => {
    const wrapper = shallowMount(BossCard, { props: { boss, showName: false } })
    expect(wrapper.text()).not.toContain(boss.description)
    expect(wrapper.text()).toContain(boss.location.name)
  })
})
