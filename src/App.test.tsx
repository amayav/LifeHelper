//import React from 'react';
//import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import App from './App';
import { Idols, Skill, Data, SimpleData } from './App';
import {PERFECT_SUPPORT_3, PERFECT_SUPPORT_2, PERFECT_SUPPORT_1, SKILL_BOOST, DAMAGE_GUARD, ENCORE, CINDERELLA_MAGIC, OTHER} from './App';

let container: any = null
beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

class TestIdols extends Idols {
  public testUpdateTimeLine(startTime: number, skills: Skill[], music_time: number = 120, is_resonance: boolean = false) {
    return super.updateTimeLine(startTime, skills, music_time, is_resonance)
  }
  public testGetSimpleTimeLine() {
    return super.getSimpleTimeLine()
  }

  public setResonace(is_resonance: boolean): void {
    this.setState({is_resonance: is_resonance})
  }
}

const perfect_support_3_skill: Skill = {name: PERFECT_SUPPORT_3, interval: 8, time: "time_a"}
const perfect_support_2_skill: Skill = {name: PERFECT_SUPPORT_2, interval: 8, time: "time_a"}
const perfect_support_1_skill: Skill = {name: PERFECT_SUPPORT_1, interval: 8, time: "time_a"}
const skill_boost_skill: Skill = {name: SKILL_BOOST, interval: 8, time: "time_a"}
const encore_skill: Skill = {name: ENCORE, interval: 8, time: "time_a"}
const damage_guard_skill: Skill = {name: DAMAGE_GUARD, interval: 8, time: "time_a"}
const cinderella_magic_skill: Skill = {name: CINDERELLA_MAGIC, interval: 8, time: "time_a"}
const other_skill: Skill = {name: OTHER, interval: 8, time: "time_a"}

test('time 0', () => {
  const t = new TestIdols({} as any)
  const skills: Skill[] = [
    {name: PERFECT_SUPPORT_3, interval: 8, time: "time_a"},
    {name: SKILL_BOOST, interval: 8, time: "time_a"},
    {name: OTHER, interval: 8, time: "time_a"},
    {name: OTHER, interval: 8, time: "time_a"},
    {name: OTHER, interval: 8, time: "time_a"},
  ]
  const data: Data = t.testUpdateTimeLine(0, skills)

  const expectData: Data = {
    start: "0.0 - 0.5",
    idol1: "",
    idol2: "",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)
})

test('perfect_support_skill_boost', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [
    {name: PERFECT_SUPPORT_3, interval: 8, time: "time_a"},
    {name: SKILL_BOOST, interval: 8, time: "time_a"},
    other_skill,
    other_skill,
    other_skill,
  ]
  let data: Data = t.testUpdateTimeLine(8, skills)
  const expectData: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "p",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  skills = [
    {name: PERFECT_SUPPORT_3, interval: 8, time: "time_a"},
    {name: OTHER, interval: 8, time: "time_a"},
    {name: SKILL_BOOST, interval: 8, time: "time_a"},
    {name: OTHER, interval: 8, time: "time_a"},
    {name: OTHER, interval: 8, time: "time_a"},
  ]
  data = t.testUpdateTimeLine(8, skills)
  expect(data).toEqual(expectData)
})

test('guard enabling in each position', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [ damage_guard_skill, other_skill, other_skill, other_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(8, skills)
  const expectData: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "g"
  }
  expect(data).toEqual(expectData)

  skills = [ other_skill, damage_guard_skill, other_skill, other_skill, other_skill, ]
  data = t.testUpdateTimeLine(8, skills)
  expect(data).toEqual(expectData)

  skills = [ other_skill, other_skill, damage_guard_skill, other_skill, other_skill, ]
  data = t.testUpdateTimeLine(8, skills)
  expect(data).toEqual(expectData)

  skills = [ other_skill, other_skill, other_skill, damage_guard_skill, other_skill, ]
  data = t.testUpdateTimeLine(8, skills)
  expect(data).toEqual(expectData)

  skills = [ other_skill, other_skill, other_skill, other_skill, damage_guard_skill, ]
  data = t.testUpdateTimeLine(8, skills)
  expect(data).toEqual(expectData)

  skills = [ other_skill, other_skill, other_skill, other_skill, other_skill, ]
  data = t.testUpdateTimeLine(8, skills)
  const expectNoGuardData: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectNoGuardData)
})

test('guard enalbed and disabled in border time', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [ damage_guard_skill, other_skill, other_skill, other_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(7.5, skills)
  const expectNoGuard75Data: Data = {
    start: "7.5 - 8.0",
    idol1: "",
    idol2: "",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectNoGuard75Data)

  data = t.testUpdateTimeLine(8, skills)
  const expectGuard80Data: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "g"
  }
  expect(data).toEqual(expectGuard80Data)

  data = t.testUpdateTimeLine(11, skills)
  const expectGuard110Data: Data = {
    start: "11.0 - 11.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "g"
  }
  expect(data).toEqual(expectGuard110Data)

  data = t.testUpdateTimeLine(11.5, skills)
  const expectNoGuard115Data: Data = {
    start: "11.5 - 12.0",
    idol1: "",
    idol2: "",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectNoGuard115Data)
})

test('encore is not activated if no other skills have been activated', () => {
  const t = new TestIdols({} as any)
  const encore_skill: Skill = {name: ENCORE, interval: 7, time: "time_a"}
  let skills: Skill[] = [ damage_guard_skill, encore_skill, other_skill, other_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(7, skills)
  let expectData: Data = {
    start: "7.0 - 7.5",
    idol1: "",
    idol2: "",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)
})

test('encore is activated if other skills have been activated', () => {
  const t = new TestIdols({} as any)
  const other_skill: Skill = {name: OTHER, interval: 18, time: "time_a"}
  let skills: Skill[] = [ damage_guard_skill, encore_skill, other_skill, other_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(8, skills)
  let expectData: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "g"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(11.0, skills)
  expectData = {
    start: "11.0 - 11.5",
    idol1: "1",
    idol2: "",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "g"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(11.5, skills)
  expectData = {
    start: "11.5 - 12.0",
    idol1: "",
    idol2: "",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(16.0, skills)
  expectData = {
    start: "16.0 - 16.5",
    idol1: "1",
    idol2: "1",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "g"
  }
  expect(data).toEqual(expectData)
})

test('cinderella magic without encore', () => {
  const t = new TestIdols({} as any)
  const cinderella_magic_skill: Skill = {name: CINDERELLA_MAGIC, interval: 6, time: "time_a"}

  let skills: Skill[] = [ damage_guard_skill, cinderella_magic_skill, other_skill, other_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(6, skills)
  let expect_data: Data = {
    start: "6.0 - 6.5",
    idol1: "",
    idol2: "12345",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "g"
  }
  expect(data).toEqual(expect_data)

  skills = [ perfect_support_3_skill, cinderella_magic_skill, skill_boost_skill, other_skill, other_skill, ]
  data = t.testUpdateTimeLine(6, skills)
  expect_data = {
    start: "6.0 - 6.5",
    idol1: "",
    idol2: "12345",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "p",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

})

test('do encore cinderella magic', () => {
  const t = new TestIdols({} as any)
  const cinderella_magic_skill: Skill = {name: CINDERELLA_MAGIC, interval: 6, time: "time_a"}
  const encore_skill: Skill = {name: ENCORE, interval: 11, time: "time_a"}
  const perfect_support_3_skill: Skill = {name: PERFECT_SUPPORT_3, interval: 18, time: "time_a"}
  const skill_boost_skill: Skill = {name: SKILL_BOOST, interval: 18, time: "time_a"}
  const other_skill: Skill = {name: OTHER, interval: 18, time: "time_a"}

  let skills: Skill[] = [ cinderella_magic_skill, encore_skill, perfect_support_3_skill, skill_boost_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(6.0, skills)
  let expect_data: Data = {
    start: "6.0 - 6.5",
    idol1: "12345",
    idol2: "",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "p",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(10.5, skills)
  expect_data = {
    start: "10.5 - 11.0",
    idol1: "",
    idol2: "",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(11.0, skills)
  expect_data = {
    start: "11.0 - 11.5",
    idol1: "",
    idol2: "12345",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "p",
    guard: "-"
  }
  expect(data).toEqual(expect_data)
})

test('skill isn\'t activated last 3 seconds of music', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [ other_skill, other_skill, other_skill, other_skill, other_skill ]
  const music_time = 18.5
  let data: Data = t.testUpdateTimeLine(8.0, skills, music_time)
  let expect_data: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(11.0, skills, music_time)
  expect_data = {...expect_data, start: "11.0 - 11.5"}
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(11.5, skills, music_time)
  expect_data = {
    start: "11.5 - 12.0",
    idol1: "",
    idol2: "",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(15.5, skills, music_time)
  expect_data = {...expect_data, start: "15.5 - 16.0"}
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(16.0, skills, music_time)
  expect_data = {...expect_data, start: "16.0 - 16.5"}
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(16.5, skills, music_time)
  expect_data = {...expect_data, start: "16.5 - 17.0"}
  expect(data).toEqual(expect_data)
})

test('resonance perfect support 3 + 3', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [ perfect_support_3_skill, perfect_support_3_skill, other_skill, other_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(8, skills, 120, false)
  let expect_data: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(8, skills, 120, true)
  expect_data = {...expect_data, perfect: "p"}
  expect(data).toEqual(expect_data)
})

test('resonance perfect support 3 + 2', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [ perfect_support_3_skill, perfect_support_2_skill, other_skill, other_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(8, skills, 120, false)
  let expect_data: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(8, skills, 120, true)
  expect_data = {...expect_data, perfect: "p"}
  expect(data).toEqual(expect_data)
})

test('resonance perfect support 3 + 1', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [ perfect_support_3_skill, perfect_support_1_skill, other_skill, other_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(8, skills, 120, false)
  let expect_data: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(8, skills, 120, true)
  expect_data = {...expect_data, perfect: "p"}
  expect(data).toEqual(expect_data)
})

test('resonance perfect support 3', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [ perfect_support_3_skill, other_skill, other_skill, other_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(8, skills, 120, false)
  let expect_data: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(8, skills, 120, true)
  expect(data).toEqual(expect_data)
})

test('resonance perfect support 2 + 2', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [ perfect_support_2_skill, perfect_support_2_skill, other_skill, other_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(8, skills, 120, false)
  let expect_data: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(8, skills, 120, true)
  expect_data = {...expect_data, perfect: "p"}
  expect(data).toEqual(expect_data)
})

test('resonance perfect support 2 + skill boost * 2', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [ perfect_support_2_skill, skill_boost_skill, skill_boost_skill, other_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(8, skills, 120, false)
  let expect_data: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(8, skills, 120, true)
  expect_data = {...expect_data, perfect: "p"}
  expect(data).toEqual(expect_data)
})

test('resonance perfect support 2 + 1', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [ perfect_support_2_skill, perfect_support_1_skill, other_skill, other_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(8, skills, 120, false)
  let expect_data: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(8, skills, 120, true)
  expect(data).toEqual(expect_data)
})

test('resonance perfect support 2', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [ perfect_support_2_skill, other_skill, other_skill, other_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(8, skills, 120, false)
  let expect_data: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(8, skills, 120, true)
  expect(data).toEqual(expect_data)
})

test('resonance perfect support 2 + 1 + skill boost', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [ perfect_support_2_skill, perfect_support_1_skill, skill_boost_skill, other_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(8, skills, 120, false)
  let expect_data: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(8, skills, 120, true)
  expect_data = {...expect_data, perfect: "p"}
  expect(data).toEqual(expect_data)
})

test('resonance perfect support 1 + 1 + skill boost * 2', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [ perfect_support_1_skill, perfect_support_1_skill, skill_boost_skill, skill_boost_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(8, skills, 120, false)
  let expect_data: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(8, skills, 120, true)
  expect_data = {...expect_data, perfect: "p"}
  expect(data).toEqual(expect_data)
})

test('resonance perfect support 1 + skill boost * 3', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [ perfect_support_1_skill, skill_boost_skill, skill_boost_skill, skill_boost_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(8, skills, 120, false)
  let expect_data: Data = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(8, skills, 120, true)
  expect_data = {...expect_data, perfect: "p"}
  expect(data).toEqual(expect_data)
})

test('simple timeline', () => {
  const t = new TestIdols({} as any)
  const damage_guard_skill: Skill = {name: DAMAGE_GUARD, interval: 12, time: "time_e"}
  let skills: Skill[] = [ perfect_support_3_skill, skill_boost_skill, damage_guard_skill, other_skill, other_skill, ]

  const timeList : number[] = [...Array(20*2)].map((_i, i) => i/2)

  let data: Data[] = timeList.map(startTime => {
      return t.updateTimeLine(startTime, skills, 20, false)
  })

  const simple_timeline: SimpleData[] = t.testGetSimpleTimeLine()
  const expect_timeline: SimpleData[] = [
  {start: "0.0 - 8.0", time: "8.0", mode: ""},
  {start: "8.0 - 11.5", time: "3.5", mode: "p"},
  {start: "11.5 - 12.0", time: "0.5", mode: ""},
  {start: "12.0 - 16.0", time: "4.0", mode: "g"},
  {start: "16.0 - 19.5", time: "3.5", mode: "p"},
  ]
  /* the last part is calculated in another place
  {start: "19.5 - 20.0", time: "0.5", mode: "g"}
  */

  expect(simple_timeline).toEqual(expect_timeline)
})
