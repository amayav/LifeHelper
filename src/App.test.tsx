//import React from 'react';
//import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import App from './App';
import { Idols, Skill, Data } from './App';
import {PERFECT_SUPPORT_3, SKILL_BOOST, DAMAGE_GUARD, OTHER} from './App';

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
  public testUpdateTimeLine(startTime: number, skills: Skill[]) {
    return this.updateTimeLine(startTime, skills)
  }
}

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
    start: "0.0",
    end: "0.5",
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
    {name: OTHER, interval: 8, time: "time_a"},
    {name: OTHER, interval: 8, time: "time_a"},
    {name: OTHER, interval: 8, time: "time_a"},
  ]
  let data: Data = t.testUpdateTimeLine(8, skills)
  const expectData: Data = {
    start: "8.0",
    end: "8.5",
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

test('guard', () => {
  const t = new TestIdols({} as any)
  const damage_guard_skill: Skill = {name: DAMAGE_GUARD, interval: 8, time: "time_a"}
  const other_skill: Skill = {name: OTHER, interval: 8, time: "time_a"}
  let skills: Skill[] = [ damage_guard_skill, other_skill, other_skill, other_skill, other_skill, ]
  let data: Data = t.testUpdateTimeLine(8, skills)
  const expectData: Data = {
    start: "8.0",
    end: "8.5",
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
    start: "8.0",
    end: "8.5",
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
