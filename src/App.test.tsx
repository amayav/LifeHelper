//import React from 'react';
//import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import App from './App';
import { Idols, Skill, Data, GrandData, SimpleData } from './App';
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
  public testUpdateGrandTimeLine(startTime: number, skills: Skill[][], music_time: number = 120, is_resonance: boolean = false) {
    return super.updateGrandTimeLine(startTime, skills, music_time, is_resonance)
  }
  public testUpdate(skills: Skill[], music_time: number = 120, is_resonance: boolean = false) {
    return super.update(skills, music_time, is_resonance)
  }
  public testGetSimpleTimeLine(): SimpleData[] {
    return super.getSimpleTimeLine()
  }
  public testGetPerfectTime(): number {
    return super.getPerfectTime()
  }
  public testGetPerfectRatio(): number {
    return super.getPerfectRatio()
  }
  public testGetNoMissTime(): number {
    return super.getNoMissTime()
  }
  public testGetNoMissRatio(): number {
    return super.getNoMissRatio()
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

test('tiem_a', () => {
  const t = new TestIdols({} as any)
  let skills: Skill[] = [
    other_skill,
    other_skill,
    other_skill,
    other_skill,
    other_skill,
  ]
  let data: Data = t.testUpdateTimeLine(7.5, skills)
  let expectData: Data = {
    start: "7.5 - 8.0",
    idol1: "",
    idol2: "",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(8.0, skills)
  expectData = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(10.5, skills)
  expectData = {
    start: "10.5 - 11.0",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(11.0, skills)
  expectData = {
    start: "11.0 - 11.5",
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

test('tiem_b', () => {
  const other_skill: Skill = {name: OTHER, interval: 8, time: "time_b"}
  const t = new TestIdols({} as any)
  let skills: Skill[] = [
    other_skill,
    other_skill,
    other_skill,
    other_skill,
    other_skill,
  ]
  let data: Data = t.testUpdateTimeLine(7.5, skills)
  let expectData: Data = {
    start: "7.5 - 8.0",
    idol1: "",
    idol2: "",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(8.0, skills)
  expectData = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(12.0, skills)
  expectData = {
    start: "12.0 - 12.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(12.5, skills)
  expectData = {
    start: "12.5 - 13.0",
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

test('tiem_c', () => {
  const other_skill: Skill = {name: OTHER, interval: 8, time: "time_c"}
  const t = new TestIdols({} as any)
  let skills: Skill[] = [
    other_skill,
    other_skill,
    other_skill,
    other_skill,
    other_skill,
  ]
  let data: Data = t.testUpdateTimeLine(7.5, skills)
  let expectData: Data = {
    start: "7.5 - 8.0",
    idol1: "",
    idol2: "",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(8.0, skills)
  expectData = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(13.5, skills)
  expectData = {
    start: "13.5 - 14.0",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(14.0, skills)
  expectData = {
    start: "14.0 - 14.5",
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

test('tiem_d', () => {
  const other_skill: Skill = {name: OTHER, interval: 8, time: "time_d"}
  const t = new TestIdols({} as any)
  let skills: Skill[] = [
    other_skill,
    other_skill,
    other_skill,
    other_skill,
    other_skill,
  ]
  let data: Data = t.testUpdateTimeLine(7.5, skills)
  let expectData: Data = {
    start: "7.5 - 8.0",
    idol1: "",
    idol2: "",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(8.0, skills)
  expectData = {
    start: "8.0 - 8.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(15.0, skills)
  expectData = {
    start: "15.0 - 15.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(15.5, skills)
  expectData = {
    start: "15.5 - 16.0",
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

test('tiem_e', () => {
  const other_skill: Skill = {name: OTHER, interval: 10, time: "time_e"}
  const t = new TestIdols({} as any)
  let skills: Skill[] = [
    other_skill,
    other_skill,
    other_skill,
    other_skill,
    other_skill,
  ]
  let data: Data = t.testUpdateTimeLine(9.5, skills)
  let expectData: Data = {
    start: "9.5 - 10.0",
    idol1: "",
    idol2: "",
    idol3: "",
    idol4: "",
    idol5: "",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(10.0, skills)
  expectData = {
    start: "10.0 - 10.5",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(18.5, skills)
  expectData = {
    start: "18.5 - 19.0",
    idol1: "1",
    idol2: "2",
    idol3: "3",
    idol4: "4",
    idol5: "5",
    perfect: "-",
    guard: "-"
  }
  expect(data).toEqual(expectData)

  data = t.testUpdateTimeLine(19.0, skills)
  expectData = {
    start: "19.0 - 19.5",
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

  data = t.testUpdateTimeLine(10.5, skills)
  expectData = {
    start: "10.5 - 11.0",
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

  data = t.testUpdateTimeLine(10.5, skills, music_time)
  expect_data = {...expect_data, start: "10.5 - 11.0"}
  expect(data).toEqual(expect_data)

  data = t.testUpdateTimeLine(11.0, skills, music_time)
  expect_data = {
    start: "11.0 - 11.5",
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

  t.testUpdate(skills, 20, false)

  const simple_timeline: SimpleData[] = t.testGetSimpleTimeLine()
  const expect_timeline: SimpleData[] = [
  {start: "0.0 - 8.0", time: "8.0", mode: ""},
  {start: "8.0 - 11.0", time: "3.0", mode: "p"},
  {start: "11.0 - 12.0", time: "1.0", mode: ""},
  {start: "12.0 - 16.0", time: "4.0", mode: "g"},
  {start: "16.0 - 19.0", time: "3.0", mode: "p"},
  {start: "19.0 - 20.0", time: "1.0", mode: "g"}
  ]
  expect(simple_timeline).toEqual(expect_timeline)
})

test('time/ratio', () => {
  const t = new TestIdols({} as any)
  const timeList : number[] = [...Array(20*2)].map((_i, i) => i/2)
  const damage_guard_skill: Skill = {name: DAMAGE_GUARD, interval: 12, time: "time_e"}
  let skills: Skill[] = [ perfect_support_3_skill, skill_boost_skill, damage_guard_skill, other_skill, other_skill, ]

  t.testUpdate(skills, 20, false)

  const perfect_time = t.testGetPerfectTime()
  const expect_perfect_time = 6.0
  expect(perfect_time).toEqual(expect_perfect_time)

  const perfect_ratio = t.testGetPerfectRatio()
  const expect_perfect_ratio = 30
  expect(perfect_ratio).toEqual(expect_perfect_ratio)

  const no_miss_time = t.testGetNoMissTime()
  const expect_no_miss_time = 11.0
  expect(no_miss_time).toEqual(expect_no_miss_time)

  const no_miss_ratio = Math.round(t.testGetNoMissRatio()*10)/10
  const expect_no_miss_ratio = 55
  expect(no_miss_ratio).toEqual(expect_no_miss_ratio)
})

test('skill interval in GRAND LIVE', () => {
  const t = new TestIdols({} as any)
  const other_skill: Skill = {name: OTHER, interval: 100, time: "time_a"};
  const skills: [Skill[], Skill[], Skill[]] = [
    [perfect_support_3_skill, perfect_support_3_skill, perfect_support_3_skill, perfect_support_3_skill, perfect_support_3_skill],
    [perfect_support_3_skill, perfect_support_3_skill, perfect_support_3_skill, perfect_support_3_skill, perfect_support_3_skill],
    [perfect_support_3_skill, perfect_support_3_skill, perfect_support_3_skill, perfect_support_3_skill, perfect_support_3_skill],
  ];

  let data: GrandData = t.testUpdateGrandTimeLine(7.5, skills);
  let expectData1: GrandData = {
    start: "7.5 - 8.0",
    idolA1: "",
    idolA2: "",
    idolA3: "",
    idolA4: "",
    idolA5: "",
    idolB1: "",
    idolB2: "",
    idolB3: "",
    idolB4: "",
    idolB5: "",
    idolC1: "",
    idolC2: "",
    idolC3: "",
    idolC4: "",
    idolC5: "",
    perfect: "-",
    guard: "-"
  };
  expect(data).toEqual(expectData1);

  data = t.testUpdateGrandTimeLine(8.0, skills);
  let expectData2: GrandData = {
    start: "8.0 - 8.5",
    idolA1: "1",
    idolA2: "2",
    idolA3: "3",
    idolA4: "4",
    idolA5: "5",
    idolB1: "",
    idolB2: "",
    idolB3: "",
    idolB4: "",
    idolB5: "",
    idolC1: "",
    idolC2: "",
    idolC3: "",
    idolC4: "",
    idolC5: "",
    perfect: "-",
    guard: "-"
  };
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(10.5, skills);
  expectData2 = {...expectData2, start: "10.5 - 11.0"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(11.0, skills);
  expectData1 = {...expectData1, start: "11.0 - 11.5"};
  expect(data).toEqual(expectData1);

  data = t.testUpdateGrandTimeLine(15.5, skills);
  expectData1 = {...expectData1, start: "15.5 - 16.0"};
  expect(data).toEqual(expectData1);

  data = t.testUpdateGrandTimeLine(16.0, skills);
  expectData2 = {...expectData2, start: "16.0 - 16.5", idolA1: "", idolA2: "", idolA3: "", idolA4: "", idolA5: "", idolB1: "1", idolB2: "2", idolB3: "3", idolB4: "4", idolB5: "5"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(18.5, skills);
  expectData2 = {...expectData2, start: "18.5 - 19.0"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(19.0, skills);
  expectData1 = {...expectData1, start: "19.0 - 19.5"};
  expect(data).toEqual(expectData1);

  data = t.testUpdateGrandTimeLine(23.5, skills);
  expectData1 = {...expectData1, start: "23.5 - 24.0"};
  expect(data).toEqual(expectData1);

  data = t.testUpdateGrandTimeLine(24.0, skills);
  expectData2 = {...expectData2, start: "24.0 - 24.5", idolB1: "", idolB2: "", idolB3: "", idolB4: "", idolB5: "", idolC1: "1", idolC2: "2", idolC3: "3", idolC4: "4", idolC5: "5"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(26.5, skills);
  expectData2 = {...expectData2, start: "26.5 - 27.0"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(27.0, skills);
  expectData1 = {...expectData1, start: "27.0 - 27.5"};
  expect(data).toEqual(expectData1);

  data = t.testUpdateGrandTimeLine(31.5, skills);
  expectData1 = {...expectData1, start: "31.5 - 32.0"};
  expect(data).toEqual(expectData1);

  data = t.testUpdateGrandTimeLine(32.0, skills);
  expectData2 = {...expectData2, start: "32.0 - 32.5", idolC1: "", idolC2: "", idolC3: "", idolC4: "", idolC5: "", idolA1: "1", idolA2: "2", idolA3: "3", idolA4: "4", idolA5: "5"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(34.5, skills);
  expectData2 = {...expectData2, start: "34.5 - 35.0"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(35.0, skills);
  expectData1 = {...expectData1, start: "35.0 - 35.5"};
  expect(data).toEqual(expectData1);

  data = t.testUpdateGrandTimeLine(39.5, skills);
  expectData1 = {...expectData1, start: "39.5 - 40.0"};
  expect(data).toEqual(expectData1);

  data = t.testUpdateGrandTimeLine(40.0, skills);
  expectData2 = {...expectData2, start: "40.0 - 40.5", idolA1: "", idolA2: "", idolA3: "", idolA4: "", idolA5: "", idolB1: "1", idolB2: "2", idolB3: "3", idolB4: "4", idolB5: "5"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(42.5, skills);
  expectData2 = {...expectData2, start: "42.5 - 43.0"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(43.0, skills);
  expectData1 = {...expectData1, start: "43.0 - 43.5"};
  expect(data).toEqual(expectData1);

  data = t.testUpdateGrandTimeLine(47.5, skills);
  expectData1 = {...expectData1, start: "47.5 - 48.0"};
  expect(data).toEqual(expectData1);

  data = t.testUpdateGrandTimeLine(48.0, skills);
  expectData2 = {...expectData2, start: "48.0 - 48.5", idolB1: "", idolB2: "", idolB3: "", idolB4: "", idolB5: "", idolC1: "1", idolC2: "2", idolC3: "3", idolC4: "4", idolC5: "5"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(50.5, skills);
  expectData2 = {...expectData2, start: "50.5 - 51.0"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(51.0, skills);
  expectData1 = {...expectData1, start: "51.0 - 51.5"};
  expect(data).toEqual(expectData1);

})

test('perfect support and skill boost in grand', () => {
  const t = new TestIdols({} as any);
  const other_skill: Skill = {name: OTHER, interval: 100, time: "time_a"};
  const skillsA: Skill[][] = [
    [perfect_support_3_skill, skill_boost_skill, other_skill, other_skill, other_skill],
    [other_skill, other_skill, other_skill, other_skill, other_skill],
    [other_skill, other_skill, other_skill, other_skill, other_skill],
  ];

  let data: GrandData = t.testUpdateGrandTimeLine(7.5, skillsA);
  let expectData1: GrandData = {
    start: "7.5 - 8.0",
    idolA1: "",
    idolA2: "",
    idolA3: "",
    idolA4: "",
    idolA5: "",
    idolB1: "",
    idolB2: "",
    idolB3: "",
    idolB4: "",
    idolB5: "",
    idolC1: "",
    idolC2: "",
    idolC3: "",
    idolC4: "",
    idolC5: "",
    perfect: "-",
    guard: "-"
  };
  expect(data).toEqual(expectData1);

  data = t.testUpdateGrandTimeLine(8.0, skillsA);
  let expectData2: GrandData = {
    start: "8.0 - 8.5",
    idolA1: "1",
    idolA2: "2",
    idolA3: "",
    idolA4: "",
    idolA5: "",
    idolB1: "",
    idolB2: "",
    idolB3: "",
    idolB4: "",
    idolB5: "",
    idolC1: "",
    idolC2: "",
    idolC3: "",
    idolC4: "",
    idolC5: "",
    perfect: "p",
    guard: "-"
  };
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(10.5, skillsA);
  expectData2 = {...expectData2, start: "10.5 - 11.0"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(11.0, skillsA);
  expectData1 = {...expectData1, start: "11.0 - 11.5"};
  expect(data).toEqual(expectData1);

  const skillsB: Skill[][] = [
    [other_skill, other_skill, other_skill, other_skill, other_skill],
    [perfect_support_3_skill, skill_boost_skill, other_skill, other_skill, other_skill],
    [other_skill, other_skill, other_skill, other_skill, other_skill],
  ];

  data = t.testUpdateGrandTimeLine(15.5, skillsB);
  expectData1 = {...expectData1, start: "15.5 - 16.0"};
  expect(data).toEqual(expectData1);

  data = t.testUpdateGrandTimeLine(16.0, skillsB);
  expectData2 = {...expectData2, start: "16.0 - 16.5", idolA1: "", idolA2: "", idolB1: "1", idolB2: "2"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(18.5, skillsB);
  expectData2 = {...expectData2, start: "18.5 - 19.0"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(19.0, skillsB);
  expectData1 = {...expectData1, start: "19.0 - 19.5"};
  expect(data).toEqual(expectData1);

  const skillsC: Skill[][] = [
    [other_skill, other_skill, other_skill, other_skill, other_skill],
    [other_skill, other_skill, other_skill, other_skill, other_skill],
    [perfect_support_3_skill, skill_boost_skill, other_skill, other_skill, other_skill],
  ];

  data = t.testUpdateGrandTimeLine(15.5, skillsC);
  expectData1 = {...expectData1, start: "15.5 - 16.0"};
  expect(data).toEqual(expectData1);

  data = t.testUpdateGrandTimeLine(24.0, skillsC);
  expectData2 = {...expectData2, start: "24.0 - 24.5", idolB1: "", idolB2: "", idolC1: "1", idolC2: "2"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(26.5, skillsC);
  expectData2 = {...expectData2, start: "26.5 - 27.0"};
  expect(data).toEqual(expectData2);

  data = t.testUpdateGrandTimeLine(27.0, skillsC);
  expectData1 = {...expectData1, start: "27.0 - 27.5"};
  expect(data).toEqual(expectData1);
})
