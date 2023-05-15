import bossData from '../data/bosses'

export const getBaseData = () => {
  const data = {
    bosses: [],
    locations: []
  }

  for (let i = 0; i < bossData.length; i++) {
    const location = bossData[i]
    for (let j = 0; j < bossData[i].requirements.length; j++) {
      const boss = bossData[i].requirements[j]
      boss.completed = false
      boss.location = {
        id: location.id,
        name: location.name
      }
    }
    data.bosses.push(...bossData[i].requirements)
    delete location.requirements
    data.locations.push(location)
  }
  return data
}
