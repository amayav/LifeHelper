//import React, {useMemo, useState} from 'react';
import React from 'react';
import { useTable, Column } from 'react-table';
//import logo from './logo.svg';
import './App.css';

export interface IdolsData {
  idol1: any;
  idol2: any;
  idol3: any;
  idol4: any;
  idol5: any;
}

export interface Data {
  start: string;
  idol1: string;
  idol2: string;
  idol3: string;
  idol4: string;
  idol5: string;
  perfect: string;
  guard: string;
}

export interface GrandData {
  start: string;
  idolA1: string;
  idolA2: string;
  idolA3: string;
  idolA4: string;
  idolA5: string;
  idolB1: string;
  idolB2: string;
  idolB3: string;
  idolB4: string;
  idolB5: string;
  idolC1: string;
  idolC2: string;
  idolC3: string;
  idolC4: string;
  idolC5: string;
  perfect: string;
  guard: string;
}

export interface SimpleData {
  start: string;
  time: string;
  mode: string;
}

export interface TimeRatioData {
  perfect_time: string;
  perfect_ratio: string;
  no_damage_time: string;
  no_damage_ratio: string;
}

function Table ({ columns, data } : { columns: Column<any>[], data: any[] } ) : any {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable<any>({ columns, data });

  return(
    <table {...getTableProps()}>
    <thead>
    {headerGroups.map(headerGroup => (
      <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map(column => (
        <th {...column.getHeaderProps()}>
        {column.render("Header")}</th>
      ))}
      </tr>
    ))}
    </thead>
    <tbody {...getTableBodyProps()}>
    {rows.map((row, i) => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()}>
        {row.cells.map(cell => {
          return (
            <td {...cell.getCellProps()}>
            {cell.render("Cell")}</td>
          )
        })}
        </tr>
      );
    })}
    </tbody>
    </table>
  )
}

export type Skill = {
  name: string,
  interval: number,
  time: string
}

interface Props {
  name: string,
    skill: Skill,
    id: number,
    changeName: (id: number, time: string) => void
    changeInterval: (id: number, interval: number) => void
    changeTime: (id: number, time: string) => void
}
export const PERFECT_SUPPORT_3="perfect_support_3"
export const PERFECT_SUPPORT_2="perfect_support_2"
export const PERFECT_SUPPORT_1="perfect_support_1"
export const DAMAGE_GUARD="damage_guard"
export const SKILL_BOOST="skill_boost"
export const ENCORE="encore"
export const CINDERELLA_MAGIC="cinderella_magic"
export const OTHER="other"

let skillTimes: { [key: string]: number } = {
  'time_a': 3.0,
  'time_b': 4.5,
  'time_c': 6.0,
  'time_d': 7.5,
  'time_e': 9.0,
};

class Idol extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
    this.handleListBoxNameChange = this.handleListBoxNameChange.bind(this)
    this.handleInputBoxIntervalChange = this.handleInputBoxIntervalChange.bind(this)
    this.handleListBoxTimeChange = this.handleListBoxTimeChange.bind(this)
  }

  private handleListBoxNameChange = (e: React.ChangeEvent<HTMLSelectElement>) : any => {
    this.props.changeName(this.props.id, e.target.value)
  }

  private handleInputBoxIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) : any => {
    this.props.changeInterval(this.props.id, Number(e.target.value))
  }

  private handleListBoxTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) : any => {
    this.props.changeTime(this.props.id, e.target.value)
  }

  render() {
    return (
      <div className="idol">
        <label>{this.props.name}</label>
        <div>
          <select name={`skill_name_${this.props.id}`} id={`skill_id_${this.props.id}`} onChange={this.handleListBoxNameChange} value={this.props.skill.name}>
            <option value={PERFECT_SUPPORT_3}>SSR パーフェクトサポート</option>
            <option value={PERFECT_SUPPORT_2}>SR パーフェクトサポート</option>
            <option value={PERFECT_SUPPORT_1}>R パーフェクトサポート</option>
            <option value={DAMAGE_GUARD}>ダメージガード</option>
            <option value={SKILL_BOOST}>スキルブースト</option>
            <option value={ENCORE}>アンコール</option>
            <option value={CINDERELLA_MAGIC}>シンデレラマジック</option>
            <option value={OTHER}>その他</option>
          </select>
        </div>

        <div>
          <input type="number" id={`interval_id_${this.props.id}`} name={`interval_name_${this.props.id}`} min="1" placeholder="4" onChange={this.handleInputBoxIntervalChange} value={this.props.skill.interval}/>
          秒ごと
        </div>

        <div>
          <select name={`time_name_${this.props.id}`} id={`time_id_${this.props.id}`} onChange={this.handleListBoxTimeChange} value={this.props.skill.time}>
            <option value="time_a">一瞬の間</option>
            <option value="time_b">わずかな間</option>
            <option value="time_c">少しの間</option>
            <option value="time_d">しばらくの間</option>
            <option value="time_e">かなりの間</option>
          </select>
        </div>
      </div>
    )
  }
}

export class Idols extends React.Component <{}, {skills: Skill[], grand_skills: Skill[][], music_time: number, is_resonance: boolean, is_resonance_grand: boolean[], is_grand: boolean}> {
  constructor(props: any) {
    super(props)
    const default_skill : Skill = {
      name: PERFECT_SUPPORT_3,
      interval: 9,
      time: "time_c"
    }
    this.state = {
      skills: [default_skill, default_skill, default_skill, default_skill, default_skill],
      grand_skills: [
        [default_skill, default_skill, default_skill, default_skill, default_skill],
        [default_skill, default_skill, default_skill, default_skill, default_skill],
        [default_skill, default_skill, default_skill, default_skill, default_skill],
      ],
      music_time: 120,
      is_resonance: false,
      is_resonance_grand: [false, false, false],
      is_grand: false
    }
    this.changeName = this.changeName.bind(this)
    this.changeInterval = this.changeInterval.bind(this)
    this.changeTime = this.changeTime.bind(this)
    this.changeGrandAName = this.changeGrandAName.bind(this)
    this.changeGrandAInterval = this.changeGrandAInterval.bind(this)
    this.changeGrandATime = this.changeGrandATime.bind(this)
    this.changeGrandBName = this.changeGrandBName.bind(this)
    this.changeGrandBInterval = this.changeGrandBInterval.bind(this)
    this.changeGrandBTime = this.changeGrandBTime.bind(this)
    this.changeGrandCName = this.changeGrandCName.bind(this)
    this.changeGrandCInterval = this.changeGrandCInterval.bind(this)
    this.changeGrandCTime = this.changeGrandCTime.bind(this)
    this.handleChangeMusicTime = this.handleChangeMusicTime.bind(this)
  }

  last_activated_skill_id: number = -1
  current_encore_id_list: number[] = [-1, -1, -1, -1, -1]
  current_grand_encore_id_list: number[][] = [
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
  ]

  idolsData : IdolsData = { idol1:null, idol2:null, idol3:null, idol4:null, idol5:null, };
  idolsGrandBData : IdolsData = this.idolsData;
  idolsGrandAData : IdolsData = this.idolsData;
  idolsGrandCData : IdolsData = this.idolsData;

  data : Data[] = [ {start: "*", idol1: "*", idol2:"*", idol3:"*", idol4:"*", idol5:"*", perfect:"*", guard:"*" } ];
  grand_data : GrandData[] = [ {start: "*",
    idolB1: "*", idolB2:"*", idolB3:"*", idolB4:"*", idolB5:"*",
    idolA1: "*", idolA2:"*", idolA3:"*", idolA4:"*", idolA5:"*",
    idolC1: "*", idolC2:"*", idolC3:"*", idolC4:"*", idolC5:"*",
    perfect:"*", guard:"*" } ];

  simple_timeline: SimpleData[] = [{start: "*", time: "*", mode: "*"} ]
  simple_start_time: number = 0.0
  simple_previous_mode: string = ""
  getSimpleTimeLine(): SimpleData[] {
    return this.simple_timeline
  }

  perfect_time: number = -1
  getPerfectTime(): number {
    return this.perfect_time
  }
  perfect_ratio: number = -1
  getPerfectRatio(): number {
    return this.perfect_ratio
  }
  no_damage_time: number = -1
  getNoMissTime(): number {
    return this.no_damage_time
  }
  no_damage_ratio: number = -1
  getNoMissRatio(): number {
    return this.no_damage_ratio
  }
  time_ratio: TimeRatioData[] = [{perfect_time: "*", perfect_ratio: "*", no_damage_time: "*", no_damage_ratio: "*"}]

  private is_activated(current_time: number, skill: Skill, music_time: number): boolean {
    /*
     * skill is activated after skill interval
     * skill isn't activated the last 3 (not includes just 3) seconds of music (time when the last note is)
     */
    return (
      (current_time >= skill.interval) &&
      (((current_time - skill.interval) % skill.interval + 0.5) <= skillTimes[skill.time]) &&
      ((current_time - ((current_time - skill.interval) % skill.interval)) <= (music_time - 3))
    )
  }

  private is_activated_grand(current_time: number, skill: Skill, music_time: number, unit_number: number): boolean {
    /*
     * skill is activated after skill interval
     * skill isn't activated the last 3 (not includes just 3) seconds of music (time when the last note is)
     */
    return (
      (current_time >= skill.interval*(unit_number + 1)) &&
      (((current_time - skill.interval*(unit_number + 1)) % (skill.interval*3) + 0.5) <= skillTimes[skill.time]) &&
      ((current_time - ((current_time - skill.interval*(unit_number + 1)) % skill.interval*3)) <= (music_time - 3))
    );
  }

  private is_just_activated(current_time: number, skill: Skill, music_time: number): boolean {
    return (
      (current_time >= skill.interval) &&
      (((current_time - skill.interval) % skill.interval) === 0) &&
      (current_time <= (music_time - 3))
    );
  }

  private is_just_activated_grand(current_time: number, skill: Skill, music_time: number, unit_number: number): boolean {
    return (
      (current_time >= skill.interval*(unit_number + 1)) &&
      (((current_time - skill.interval*(unit_number + 1)) % skill.interval*3) === 0) &&
      (current_time <= (music_time - 3))
    );
  }

  private change_simple_mode(new_mode: string, simple_end_time: number): void {
    if (this.simple_previous_mode === new_mode) {
      /* continue current mode */
      return
    }
    this.simple_timeline.push({
      start: (this.simple_start_time.toFixed(1) + " - " + simple_end_time.toFixed(1)),
      time: (simple_end_time - this.simple_start_time).toFixed(1),
      mode: this.simple_previous_mode
    });
    this.simple_previous_mode = new_mode
    this.simple_start_time = simple_end_time;
  }

  updateTimeLine(current_time: number, skills: Skill[], music_time: number, is_resonance: boolean) : Data {
    let being_activated_skills_name: string[] = []

    /* define skill which encore uses */
    for (let i=4; i>=0; i--) {
      if ((skills[i].name === ENCORE) &&
        (this.is_just_activated(current_time, skills[i], music_time)) &&
        (this.last_activated_skill_id !== -1)) {
        this.current_encore_id_list[i] = this.last_activated_skill_id
      }
    }

    /* listing up activated skills and lastly activated skill*/
    for (let i=4; i>=0; i--) {
      if (!this.is_activated(current_time, skills[i], music_time)) {
        continue
      }
      if (skills[i].name === ENCORE) {
        // at least one skill other than encore should be activated
        if (this.current_encore_id_list[i] === -1) {
          continue
        }
        if ((skills[this.current_encore_id_list[i]].name) === CINDERELLA_MAGIC) {
          for (let j=4; j>=0; j--) {
            being_activated_skills_name.push(skills[j].name)
          }
        } else {
          being_activated_skills_name.push(skills[this.current_encore_id_list[i]].name)
        }
      } else {
        if (skills[i].name === CINDERELLA_MAGIC) {
          for (let j=4; j>=0; j--) {
            being_activated_skills_name.push(skills[j].name)
          }
        } else {
          being_activated_skills_name.push(skills[i].name)
        }
        /* calculate the last activated skill's id for the next 0.5 sec */
        /* encore does not copy the skills activated at the same time */
        if (this.is_just_activated(current_time, skills[i], music_time)) {
          this.last_activated_skill_id = i
        }
      }
    }

    let is_perfect: boolean = false
    if (is_resonance === false) {
      is_perfect = being_activated_skills_name.includes(PERFECT_SUPPORT_3) &&
        being_activated_skills_name.includes(SKILL_BOOST)
    } else {
      const perfect_support_3_count: number =
        (being_activated_skills_name.filter(name => name === PERFECT_SUPPORT_3)).length
      const perfect_support_2_count: number =
        (being_activated_skills_name.filter(name => name === PERFECT_SUPPORT_2)).length
      const perfect_support_1_count: number =
        (being_activated_skills_name.filter(name => name === PERFECT_SUPPORT_1)).length

      let total_perfect_support_count: number =
        perfect_support_3_count*3 + perfect_support_2_count*2 + perfect_support_1_count*1
      if (total_perfect_support_count > 0) {
        const skill_boost_count: number = (being_activated_skills_name.filter(name => name === SKILL_BOOST)).length
        total_perfect_support_count += skill_boost_count
      }
      is_perfect = (total_perfect_support_count >= 4)
    }

    const is_guard: boolean = being_activated_skills_name.includes(DAMAGE_GUARD)

    if (is_perfect === true) {
      /* change to perfect mode */
      this.change_simple_mode("p", current_time)
      this.perfect_time += 0.5
      this.no_damage_time += 0.5
    } else if (is_guard === true) {
      /* change to guard mode */
      this.change_simple_mode("g", current_time)
      this.no_damage_time += 0.5
    } else {
      /* change to miss mode */
      this.change_simple_mode("", current_time)
    }
    /* process at the end of music time is out of this function */

    let display_strings: string[] = []
    for (let id=0; id<5; id++) {
      if (
        (! this.is_activated(current_time, skills[id], music_time)) ||
        (
          // encore doesn't activate if no other skills have been activated
          (skills[id].name === ENCORE) &&
          (this.current_encore_id_list[id] === -1)
        )
      ) {
        display_strings[id] = ""
        continue
      }
      if (
        (skills[id].name === CINDERELLA_MAGIC) ||
        (
          (skills[id].name === ENCORE) &&
          (skills[this.current_encore_id_list[id]].name === CINDERELLA_MAGIC)
        )
      ) {
        display_strings[id] = "12345"
        continue
      }
      if (skills[id].name === ENCORE) {
        display_strings[id] = (this.current_encore_id_list[id] + 1).toFixed(0)
        continue
      }
      display_strings[id] = (id + 1).toFixed(0)
    }

    return {
      start: current_time.toFixed(1) + " - " + (current_time + 0.5).toFixed(1),
      idol1: display_strings[0],
      idol2: display_strings[1],
      idol3: display_strings[2],
      idol4: display_strings[3],
      idol5: display_strings[4],
      perfect: is_perfect ? "p" : "-",
      guard: is_guard ? "g" : "-",
    }
  };

  updateGrandTimeLine(current_time: number, grand_skills: Skill[][], music_time: number, is_resonance_grand: boolean[]) : GrandData {
    let being_activated_skills_name: string[][] = [[], [], []]

    /* define skill which encore uses */
    for (let j=grand_skills.length - 1; j>=0; j--) {
      let skills: Skill[] = grand_skills[j];
      for (let i=skills.length - 1; i>=0; i--) {
        if ((skills[i].name === ENCORE) &&
          (this.is_just_activated_grand(current_time, skills[i], music_time, j)) &&
          (this.last_activated_skill_id !== -1)) {
          this.current_grand_encore_id_list[j][i] = this.last_activated_skill_id;
        }
      }
    }

    /* listing up activated skills and lastly activated skill*/
    for (let k=grand_skills.length - 1; k>=0; k--) {
      let skills: Skill[] = grand_skills[k];
      for (let i=skills.length - 1; i>=0; i--) {
        if (!this.is_activated_grand(current_time, skills[i], music_time, k)) {
          continue;
        }
        if (skills[i].name === ENCORE) {
          // at least one skill other than encore should be activated
          if (this.current_grand_encore_id_list[k][i] === -1) {
            continue;
          }
          let encored_skill_unit = Math.floor(this.current_grand_encore_id_list[k][i]/skills.length);
          let encored_skill_number = this.current_grand_encore_id_list[k][i]%skills.length;
          let encored_skill = grand_skills[encored_skill_unit][encored_skill_number];
          if (encored_skill.name === CINDERELLA_MAGIC) {
            for (let j=skills.length - 1; j>=0; j--) {
              being_activated_skills_name[k].push(grand_skills[encored_skill_unit][j].name);
            }
          } else {
            being_activated_skills_name[k].push(encored_skill.name);
          }
        } else {
          if (skills[i].name === CINDERELLA_MAGIC) {
            for (let j=skills.length - 1; j>=0; j--) {
              being_activated_skills_name[k].push(skills[j].name);
            }
          } else {
            being_activated_skills_name[k].push(skills[i].name);
          }
          /* calculate the last activated skill's id for the next 0.5 sec */
          /* encore does not copy the skills activated at the same time */
          if (this.is_just_activated_grand(current_time, skills[i], music_time, k)) {
            this.last_activated_skill_id = k*skills.length + i;
          }
        }
      }
    }

    let is_perfect: boolean = false
    for (let k=grand_skills.length - 1; k>=0; k--) {
      if (is_resonance_grand[k] === false) {
        if (! being_activated_skills_name[k].includes(PERFECT_SUPPORT_3)) {
          continue;
        }
        for (let j=grand_skills.length -1; j>=0; j--) {
          if (being_activated_skills_name[j].includes(SKILL_BOOST)) {
            is_perfect = true;
            break;
          }
        }
        if (is_perfect === true) {
          break;
        }
      } else {
        const perfect_support_3_count: number =
          (being_activated_skills_name[k].filter(name => name === PERFECT_SUPPORT_3)).length;
        const perfect_support_2_count: number =
          (being_activated_skills_name[k].filter(name => name === PERFECT_SUPPORT_2)).length;
        const perfect_support_1_count: number =
          (being_activated_skills_name[k].filter(name => name === PERFECT_SUPPORT_1)).length;

        let total_perfect_support_count: number =
          perfect_support_3_count*3 + perfect_support_2_count*2 + perfect_support_1_count*1;
        if (total_perfect_support_count > 0) {
          for (let l=0; l<being_activated_skills_name.length; l++) {
            if ( l === k ) {
              continue;
            }
            const perfect_support_3_count_2: number =
              (being_activated_skills_name[l].filter(name => name === PERFECT_SUPPORT_3)).length;
            const perfect_support_2_count_2: number =
              (being_activated_skills_name[l].filter(name => name === PERFECT_SUPPORT_2)).length;
            const perfect_support_1_count_2: number =
              (being_activated_skills_name[l].filter(name => name === PERFECT_SUPPORT_1)).length;

            total_perfect_support_count +=
              perfect_support_3_count_2*3 + perfect_support_2_count_2*2 + perfect_support_1_count_2*1;
          }
          for (let l=0; l<being_activated_skills_name.length; l++) {
            const skill_boost_count: number = (being_activated_skills_name[l].filter(name => name === SKILL_BOOST)).length;
            total_perfect_support_count += skill_boost_count;
          }
        }
        if (total_perfect_support_count >= 4) {
          is_perfect = true;
          break;
        }
      }
    }
    let is_guard: boolean = false;
    for (let k=grand_skills.length - 1; k>=0; k--) {
      if (being_activated_skills_name[k].includes(DAMAGE_GUARD)) {
        is_guard = true;
      }
    }

    if (is_perfect === true) {
      /* change to perfect mode */
      this.change_simple_mode("p", current_time)
      this.perfect_time += 0.5
      this.no_damage_time += 0.5
    } else if (is_guard === true) {
      /* change to guard mode */
      this.change_simple_mode("g", current_time)
      this.no_damage_time += 0.5
    } else {
      /* change to miss mode */
      this.change_simple_mode("", current_time)
    }
    /* process at the end of music time is out of this function */

    let display_strings: string[][] = [[], [], []]
    for (let k=grand_skills.length - 1; k>=0; k--) {
      let skills: Skill[] = grand_skills[k];
      for (let id=0; id<skills.length; id++) {
        if (
          (! this.is_activated_grand(current_time, skills[id], music_time, k)) ||
          (
            // encore doesn't activate if no other skills have been activated
            (skills[id].name === ENCORE) &&
            (this.current_grand_encore_id_list[k][id] === -1)
          )
        ) {
          display_strings[k][id] = "";
          continue;
        }
        if (skills[id].name === CINDERELLA_MAGIC) {
          if (k === 0) {
            display_strings[k][id] = "A1A2A3A4A5";
          } else if (k === 1) {
            display_strings[k][id] = "B1B2B3B4B5";
          } else {
            display_strings[k][id] = "C1C2C3C4C5";
          }
          continue;
        }
        if (skills[id].name === ENCORE) {
          let encored_skill_unit = Math.floor(this.current_grand_encore_id_list[k][id]/skills.length);
          let encored_skill_number = this.current_grand_encore_id_list[k][id]%skills.length;
          let encored_skill = grand_skills[encored_skill_unit][encored_skill_number];

          if (encored_skill.name === CINDERELLA_MAGIC) {
            if (encored_skill_unit === 0) {
              display_strings[k][id] = "A1A2A3A4A5";
            } else if (encored_skill_unit === 1) {
              display_strings[k][id] = "B1B2B3B4B5";
            } else {
              display_strings[k][id] = "C1C2C3C4C5";
            }
            continue;
          }
          if (encored_skill_unit === 0) {
            display_strings[k][id] = "A" + (encored_skill_number + 1).toFixed(0);
          } else if (encored_skill_unit === 1) {
            display_strings[k][id] = "B" + (encored_skill_number + 1).toFixed(0);
          } else {
            display_strings[k][id] = "C" + (encored_skill_number + 1).toFixed(0);
          }
          continue;
        }
        if (k === 0) {
          display_strings[k][id] = "A" + (id + 1).toFixed(0);
        } else if (k === 1) {
          display_strings[k][id] = "B" + (id + 1).toFixed(0);
        } else {
          display_strings[k][id] = "C" + (id + 1).toFixed(0);
        }
      }
    }

    return {
      start: current_time.toFixed(1) + " - " + (current_time + 0.5).toFixed(1),
      idolA1: display_strings[0][0],
      idolA2: display_strings[0][1],
      idolA3: display_strings[0][2],
      idolA4: display_strings[0][3],
      idolA5: display_strings[0][4],
      idolB1: display_strings[1][0],
      idolB2: display_strings[1][1],
      idolB3: display_strings[1][2],
      idolB4: display_strings[1][3],
      idolB5: display_strings[1][4],
      idolC1: display_strings[2][0],
      idolC2: display_strings[2][1],
      idolC3: display_strings[2][2],
      idolC4: display_strings[2][3],
      idolC5: display_strings[2][4],
      perfect: is_perfect ? "p" : "-",
      guard: is_guard ? "g" : "-",
    }
  };

  update (skills: Skill[], music_time: number, is_resonance: boolean): void {
    this.last_activated_skill_id = -1
    this.current_encore_id_list = [-1, -1, -1, -1, -1]

    this.simple_timeline = []
    this.simple_start_time = 0.0
    this.simple_previous_mode = ""

    this.perfect_time = 0
    this.perfect_ratio = 0
    this.no_damage_time = 0
    this.no_damage_ratio = 0

    const timeList : number[] = [...Array(music_time*2)].map((_i, i) => i/2)

    this.data = timeList.map(startTime => {
      return this.updateTimeLine(startTime, skills, music_time, is_resonance)
    })

    this.simple_timeline.push({
      start: this.simple_start_time.toFixed(1) + " - " + music_time.toFixed(1),
      time: (music_time - this.simple_start_time).toFixed(1),
      mode: this.simple_previous_mode
    })

    this.perfect_ratio = this.perfect_time / music_time * 100
    this.no_damage_ratio = this.no_damage_time / music_time * 100

    this.time_ratio = [{
      perfect_time: this.perfect_time.toFixed(1),
      perfect_ratio: this.perfect_ratio.toFixed(1),
      no_damage_time: this.no_damage_time.toFixed(1),
      no_damage_ratio: this.no_damage_ratio.toFixed(1)
    }]
  }

  grandUpdate (grand_skills: Skill[][], music_time: number, is_resonance_grand: boolean[]): void {
    this.last_activated_skill_id = -1;
    this.current_grand_encore_id_list = [
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
    ];

    this.simple_timeline = [];
    this.simple_start_time = 0.0;
    this.simple_previous_mode = "";

    this.perfect_time = 0;
    this.perfect_ratio = 0;
    this.no_damage_time = 0;
    this.no_damage_ratio = 0;

    const timeList : number[] = [...Array(music_time*2)].map((_i, i) => i/2);

    this.grand_data = timeList.map(startTime => {
      return this.updateGrandTimeLine(startTime, grand_skills, music_time, is_resonance_grand);
    })

    this.simple_timeline.push({
      start: this.simple_start_time.toFixed(1) + " - " + music_time.toFixed(1),
      time: (music_time - this.simple_start_time).toFixed(1),
      mode: this.simple_previous_mode
    })

    this.perfect_ratio = this.perfect_time / music_time * 100
    this.no_damage_ratio = this.no_damage_time / music_time * 100

    this.time_ratio = [{
      perfect_time: this.perfect_time.toFixed(1),
      perfect_ratio: this.perfect_ratio.toFixed(1),
      no_damage_time: this.no_damage_time.toFixed(1),
      no_damage_ratio: this.no_damage_ratio.toFixed(1)
    }]
  }

  private changeName (id: number, name: string) {
    let new_skills : Skill[] = this.state.skills
    new_skills[id-1] = {...this.state.skills[id-1], name: name}
    this.setState({skills: new_skills})
    this.update(new_skills, this.state.music_time, this.state.is_resonance)
  }

  private changeInterval (id: number, interval: number): void {
    let new_skills : Skill[] = this.state.skills
    new_skills[id-1] = {...this.state.skills[id-1], interval: interval}
    this.setState({skills: new_skills})
    this.update(new_skills, this.state.music_time, this.state.is_resonance)
  }

  private changeTime (id: number, time: string): void {
    let new_skills : Skill[] = this.state.skills
    new_skills[id-1] = {...this.state.skills[id-1], time: time}
    this.setState({skills: new_skills})
    this.update(new_skills, this.state.music_time, this.state.is_resonance)
  }

  private changeGrandName (id: number, grand_number: number, name: string): void {
    let new_grand_skills : Skill[][] = this.state.grand_skills;
    let new_skills: Skill[] = new_grand_skills[grand_number];
    new_skills[id - grand_number*5 -1] = {...this.state.grand_skills[grand_number][id - grand_number*5 - 1], name: name};
    new_grand_skills[grand_number] = new_skills;
    this.setState({grand_skills: new_grand_skills});
    this.grandUpdate(new_grand_skills, this.state.music_time, this.state.is_resonance_grand);
  }

  private changeGrandInterval (id: number, grand_number: number, interval: number): void {
    let new_grand_skills : Skill[][] = this.state.grand_skills;
    let new_skills: Skill[] = new_grand_skills[grand_number];
    new_skills[id - grand_number*5 - 1] = {...this.state.grand_skills[grand_number][id - grand_number*5 - 1], interval: interval};
    new_grand_skills[grand_number] = new_skills;
    this.setState({grand_skills: new_grand_skills});
    this.grandUpdate(new_grand_skills, this.state.music_time, this.state.is_resonance_grand);
  }

  private changeGrandTime (id: number, grand_number: number, time: string): void {
    let new_grand_skills : Skill[][] = this.state.grand_skills;
    let new_skills: Skill[] = new_grand_skills[grand_number];
    new_skills[id - grand_number*5 - 1] = {...this.state.grand_skills[grand_number][id - grand_number*5 - 1], time: time};
    new_grand_skills[grand_number] = new_skills;
    this.setState({grand_skills: new_grand_skills});
    this.grandUpdate(new_grand_skills, this.state.music_time, this.state.is_resonance_grand);
  }

  private changeGrandBName (id: number, name: string): void {
    this.changeGrandName(id, 1, name);
  }

  private changeGrandBInterval (id: number, interval: number): void {
    this.changeGrandInterval(id, 1, interval);
  }

  private changeGrandBTime (id: number, time: string): void {
    this.changeGrandTime(id, 1, time);
  }

  private changeGrandAName (id: number, name: string) {
    this.changeGrandName(id, 0, name);
  }

  private changeGrandAInterval (id: number, interval: number): void {
    this.changeGrandInterval(id, 0, interval);
  }

  private changeGrandATime (id: number, time: string): void {
    this.changeGrandTime(id, 0, time);
  }

  private changeGrandCName (id: number, name: string) {
    this.changeGrandName(id, 2, name);
  }

  private changeGrandCInterval (id: number, interval: number): void {
    this.changeGrandInterval(id, 2, interval);
  }

  private changeGrandCTime (id: number, time: string): void {
    this.changeGrandTime(id, 2, time);
  }

  private handleChangeMusicTime = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    let new_music_time: number = Number(e.target.value);
    this.setState({music_time: new_music_time});
    if (this.state.is_grand === false) {
      this.update(this.state.skills, new_music_time, this.state.is_resonance);
    } else {
      this.grandUpdate(this.state.grand_skills, new_music_time, this.state.is_resonance_grand);
    }
  }

  render() {
    const columns : Column<Data>[] = [
        { Header: "経過時間（秒）", accessor: "start" },
        { Header: "4", accessor: "idol4" },
        { Header: "2", accessor: "idol2" },
        { Header: "1", accessor: "idol1" },
        { Header: "3", accessor: "idol3" },
        { Header: "5", accessor: "idol5" },
        { Header: "PERFECT", accessor: "perfect" },
        { Header: "GUARD", accessor: "guard" },
      ]
    const grand_columns : Column<GrandData>[] = [
        { Header: "経過時間（秒）", accessor: "start" },
        { Header: "B4", accessor: "idolB4" },
        { Header: "B2", accessor: "idolB2" },
        { Header: "B1", accessor: "idolB1" },
        { Header: "B3", accessor: "idolB3" },
        { Header: "B5", accessor: "idolB5" },
        { Header: "A4", accessor: "idolA4" },
        { Header: "A2", accessor: "idolA2" },
        { Header: "A1", accessor: "idolA1" },
        { Header: "A3", accessor: "idolA3" },
        { Header: "A5", accessor: "idolA5" },
        { Header: "C4", accessor: "idolC4" },
        { Header: "C2", accessor: "idolC2" },
        { Header: "C1", accessor: "idolC1" },
        { Header: "C3", accessor: "idolC3" },
        { Header: "C5", accessor: "idolC5" },
        { Header: "PERFECT", accessor: "perfect" },
        { Header: "GUARD", accessor: "guard" },
      ]
    const simple_columns : Column<SimpleData>[] = [
        { Header: "経過時間（秒）", accessor: "start" },
        { Header: "判定", accessor: "mode" },
        { Header: "継続時間（秒）", accessor: "time" },
      ]
    const time_ratio_columns : Column<TimeRatioData>[] = [
        { Header: "PERFECT 時間（秒）", accessor: "perfect_time" },
        { Header: "PERFECT 率（%）", accessor: "perfect_ratio" },
        { Header: "ノーダメ 時間（秒）", accessor: "no_damage_time" },
        { Header: "ノーダメ 率（%）", accessor: "no_damage_ratio" },
      ]
    this.idolsData = 
      {
        idol1: <Idol name="アイドル1特技" skill={this.state.skills[0]} id={1} changeName={this.changeName} changeInterval={this.changeInterval} changeTime={this.changeTime}/>,
        idol2: <Idol name="アイドル2特技" skill={this.state.skills[1]} id={2} changeName={this.changeName} changeInterval={this.changeInterval} changeTime={this.changeTime}/>,
        idol3: <Idol name="アイドル3特技" skill={this.state.skills[2]} id={3} changeName={this.changeName} changeInterval={this.changeInterval} changeTime={this.changeTime}/>,
        idol4: <Idol name="アイドル4特技" skill={this.state.skills[3]} id={4} changeName={this.changeName} changeInterval={this.changeInterval} changeTime={this.changeTime}/>,
        idol5: <Idol name="アイドル5特技" skill={this.state.skills[4]} id={5} changeName={this.changeName} changeInterval={this.changeInterval} changeTime={this.changeTime}/>,
      }

    this.idolsGrandBData = 
      {
        idol1: <Idol name="アイドルB1特技" skill={this.state.grand_skills[1][0]} id={6} changeName={this.changeGrandBName} changeInterval={this.changeGrandBInterval} changeTime={this.changeGrandBTime}/>,
        idol2: <Idol name="アイドルB2特技" skill={this.state.grand_skills[1][1]} id={7} changeName={this.changeGrandBName} changeInterval={this.changeGrandBInterval} changeTime={this.changeGrandBTime}/>,
        idol3: <Idol name="アイドルB3特技" skill={this.state.grand_skills[1][2]} id={8} changeName={this.changeGrandBName} changeInterval={this.changeGrandBInterval} changeTime={this.changeGrandBTime}/>,
        idol4: <Idol name="アイドルB4特技" skill={this.state.grand_skills[1][3]} id={9} changeName={this.changeGrandBName} changeInterval={this.changeGrandBInterval} changeTime={this.changeGrandBTime}/>,
        idol5: <Idol name="アイドルB5特技" skill={this.state.grand_skills[1][4]} id={10} changeName={this.changeGrandBName} changeInterval={this.changeGrandBInterval} changeTime={this.changeGrandBTime}/>,
      }

    this.idolsGrandAData = 
      {
        idol1: <Idol name="アイドルA1特技" skill={this.state.grand_skills[0][0]} id={1} changeName={this.changeGrandAName} changeInterval={this.changeGrandAInterval} changeTime={this.changeGrandATime}/>,
        idol2: <Idol name="アイドルA2特技" skill={this.state.grand_skills[0][1]} id={2} changeName={this.changeGrandAName} changeInterval={this.changeGrandAInterval} changeTime={this.changeGrandATime}/>,
        idol3: <Idol name="アイドルA3特技" skill={this.state.grand_skills[0][2]} id={3} changeName={this.changeGrandAName} changeInterval={this.changeGrandAInterval} changeTime={this.changeGrandATime}/>,
        idol4: <Idol name="アイドルA4特技" skill={this.state.grand_skills[0][3]} id={4} changeName={this.changeGrandAName} changeInterval={this.changeGrandAInterval} changeTime={this.changeGrandATime}/>,
        idol5: <Idol name="アイドルA5特技" skill={this.state.grand_skills[0][4]} id={5} changeName={this.changeGrandAName} changeInterval={this.changeGrandAInterval} changeTime={this.changeGrandATime}/>,
      }

    this.idolsGrandCData = 
      {
        idol1: <Idol name="アイドルC1特技" skill={this.state.grand_skills[2][0]} id={11} changeName={this.changeGrandCName} changeInterval={this.changeGrandCInterval} changeTime={this.changeGrandCTime}/>,
        idol2: <Idol name="アイドルC2特技" skill={this.state.grand_skills[2][1]} id={12} changeName={this.changeGrandCName} changeInterval={this.changeGrandCInterval} changeTime={this.changeGrandCTime}/>,
        idol3: <Idol name="アイドルC3特技" skill={this.state.grand_skills[2][2]} id={13} changeName={this.changeGrandCName} changeInterval={this.changeGrandCInterval} changeTime={this.changeGrandCTime}/>,
        idol4: <Idol name="アイドルC4特技" skill={this.state.grand_skills[2][3]} id={14} changeName={this.changeGrandCName} changeInterval={this.changeGrandCInterval} changeTime={this.changeGrandCTime}/>,
        idol5: <Idol name="アイドルC5特技" skill={this.state.grand_skills[2][4]} id={15} changeName={this.changeGrandCName} changeInterval={this.changeGrandCInterval} changeTime={this.changeGrandCTime}/>,
      }

    const handleChangeIsGrand = (e: React.ChangeEvent<HTMLInputElement>) => {
      const new_is_grand: boolean = e.target.checked
      this.setState({is_grand: new_is_grand})
    };

    const handleResonanceCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const new_is_resonance: boolean = e.target.checked
      this.setState({is_resonance: new_is_resonance})
      this.update(this.state.skills, this.state.music_time, new_is_resonance)
    };

    const ResonanceCheckBox = () => {
      return (
        <>
          <label htmlFor="resonance">センター効果 レゾナンス・XXX 有効？</label>
          <input
            type="checkbox"
            id="center_id"
            name="center"
            onChange={handleResonanceCheckBoxChange}
            checked={this.state.is_resonance}
            value="center"
            key="center"
          />
      </>
      )
    }

    const handleResonanceGrandCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const unit_number: number = Number(e.currentTarget.getAttribute('data-unit_number'));
      let new_is_resonance_grand: boolean[] = this.state.is_resonance_grand;
      new_is_resonance_grand[unit_number] = e.target.checked;
      console.log(new_is_resonance_grand);
      this.setState({is_resonance_grand: new_is_resonance_grand});
      this.grandUpdate(this.state.grand_skills, this.state.music_time, new_is_resonance_grand);
    };

    const ResonanceGrandCheckBox = (unit_number: number) => {
      return (
        <>
          <label htmlFor="resonance">センター効果 レゾナンス・XXX 有効？</label>
          <input
            type="checkbox"
            id={`center_id_${unit_number}`}
            name={`center_${unit_number}`}
            onChange={handleResonanceGrandCheckBoxChange}
            checked={this.state.is_resonance_grand[unit_number]}
            value="center"
            key="center"
            data-unit_number={`${unit_number}`}
          />
      </>
      )
    }

    function displayUnits(this: Idols) {
      if (this.state.is_grand === false) {
        return (
          <div className="table">
            <div>
              <ResonanceCheckBox />
            </div>
            <div className="idols">
              {this.idolsData.idol4}
              {this.idolsData.idol2}
              {this.idolsData.idol1}
              {this.idolsData.idol3}
              {this.idolsData.idol5}
            </div>
          </div>
      )
      } else {
        return (
            <div className="table">
              <div>
                <div>
                  <label>ユニットB </label>
                <div>
                </div>
                  {ResonanceGrandCheckBox(1)}
                </div>
                <div className="idols">
                  {this.idolsGrandBData.idol4}
                  {this.idolsGrandBData.idol2}
                  {this.idolsGrandBData.idol1}
                  {this.idolsGrandBData.idol3}
                  {this.idolsGrandBData.idol5}
                </div>
              </div>
              <div>
                <div>
                  <label>ユニットA </label>
                </div>
                <div>
                  {ResonanceGrandCheckBox(0)}
                </div>
                <div className="idols">
                  {this.idolsGrandAData.idol4}
                  {this.idolsGrandAData.idol2}
                  {this.idolsGrandAData.idol1}
                  {this.idolsGrandAData.idol3}
                  {this.idolsGrandAData.idol5}
                </div>
              </div>
              <div>
                <div>
                  <label>ユニットC </label>
                </div>
                <div>
                  {ResonanceGrandCheckBox(2)}
                </div>
                <div className="idols">
                  {this.idolsGrandCData.idol4}
                  {this.idolsGrandCData.idol2}
                  {this.idolsGrandCData.idol1}
                  {this.idolsGrandCData.idol3}
                  {this.idolsGrandCData.idol5}
                </div>
              </div>
            </div>
        )
      }
    }

    return (
      <>
        <div>
        <label htmlFor="is_grand_live">グランドライブ</label>
        <input
          type="checkbox"
          id="grand_live"
          name="grand_live"
          checked={this.state.is_grand}
          onChange={handleChangeIsGrand}
          value="grand_live"
          key="g"
        />
        </div>
        { displayUnits.call(this) }
        <div>
        楽曲時間（残り3秒未満になると特技が発動しない）：
        <input
          type="number"
          id="music_time"
          name="music_time"
          onChange={this.handleChangeMusicTime}
          value={this.state.music_time}
        />
        秒
        </div>
        <div>
          <Table columns={time_ratio_columns} data={this.time_ratio}/>
        </div>
        <div className="table simple">
          <label>簡易時系列
            <Table columns={simple_columns} data={this.simple_timeline}/>
          </label>
        </div>
        <div className="table detailed">
          <label>詳細時系列
            {
              (() => {
                if (this.state.is_grand) {
                  return <Table columns={grand_columns} data={this.grand_data}/>;
                } else {
                  return <Table columns={columns} data={this.data}/>;
                }
              })()
            }
          </label>
        </div>
      </>
    )
  }
}

function App() {
  return (
    <>
      <div className="App">
        <div>
          <p>アイドルマスター スターリットシーズン好評発売中！</p>
        </div>
        <div>
          <p>アイドルの自主性に任せるプロデュースを応援</p>
          <p>チューニング は SR パーフェクトサポート と同じ</p>
          <p>トリコロール・シンフォニー は スキルブースト と同じ</p>
          <p>特技レベル10、特技発動率 100% 前提</p>
        </div>
        <div>
          <p>使ったらシンデレラガールズ総選挙で小早川紗枝に投票しますよね</p>
          <p>挙動がおかしいと思ったり要望があったりしたら<a href="https://github.com/amayav/LifeHelper">ソースコード</a>を自分でいじってね</p>
          <p>ソースコードのライセンスは MIT License</p>
        </div>
        <Idols/>
      </div>
  </>
  );
}

export default App;
