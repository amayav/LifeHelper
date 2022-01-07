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

export interface SimpleData {
  start: string;
  time: string;
  mode: string;
}

export interface TimeRatioData {
  perfect_time: string;
  perfect_ratio: string;
  no_miss_time: string;
  no_miss_ratio: string;
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
      <>
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

      <input type="number" id={`interval_id_${this.props.id}`} name={`interval_name_${this.props.id}`} min="1" placeholder="4" onChange={this.handleInputBoxIntervalChange} value={this.props.skill.interval}/>
      秒ごと

      <select name={`time_name_${this.props.id}`} id={`time_id_${this.props.id}`} onChange={this.handleListBoxTimeChange} value={this.props.skill.time}>
      <option value="time_a">一瞬の間</option>
      <option value="time_b">わずかな間</option>
      <option value="time_c">少しの間</option>
      <option value="time_d">しばらくの間</option>
      <option value="time_e">かなりの間</option>
      </select>
      </>
      )
  }
}

export class Idols extends React.Component <{}, {skills: Skill[], music_time: number, is_resonance: boolean}> {
  constructor(props: any) {
    super(props)
    const default_skill : Skill = {
      name: PERFECT_SUPPORT_3,
      interval: 8,
      time: "time_d"
    }
    this.state = {
      skills: [default_skill, default_skill, default_skill, default_skill, default_skill],
      music_time: 120,
      is_resonance: false,
    }
    this.changeName = this.changeName.bind(this)
    this.changeInterval = this.changeInterval.bind(this)
    this.changeTime = this.changeTime.bind(this)
    this.handleChangeMusicTime = this.handleChangeMusicTime.bind(this)
  }
  last_activated_skill_id: number = -1
  current_encore_id_list: number[] = [-1, -1, -1, -1, -1]

  idolsData : IdolsData = { idol1:null, idol2:null, idol3:null, idol4:null, idol5:null, }

  data : Data[] = [ {start: "*", idol1: "*", idol2:"*", idol3:"*", idol4:"*", idol5:"*", perfect:"*", guard:"*" } ]

  simple_timeline: SimpleData[] = [{start: "*", time: "*", mode: "*"} ]
  simple_start_time: number = 0.0
  simple_previous_mode: string = ""
  private getSimpleTimeLine(): SimpleData[] {
    return this.simple_timeline
  }

  perfect_time: number = -1
  private getPerfectTime(): number {
    return this.perfect_time
  }
  perfect_ratio: number = -1
  private getPerfectRatio(): number {
    return this.perfect_ratio
  }
  no_miss_time: number = -1
  private getNoMissTime(): number {
    return this.no_miss_time
  }
  no_miss_ratio: number = -1
  private getNoMissRatio(): number {
    return this.no_miss_ratio
  }
  time_ratio: TimeRatioData[] = [{perfect_time: "*", perfect_ratio: "*", no_miss_time: "*", no_miss_ratio: "*"}]

  private is_activated(current_time: number, skill: Skill, music_time: number): boolean {
    /*
     * skill is activated after skill interval
     * skill isn't activated the last 3 (not includes just 3) seconds of music (time when the last note is)
     */
    return (
      (current_time >= skill.interval) &&
      (((current_time - skill.interval) % skill.interval) <= skillTimes[skill.time]) &&
      ((current_time - ((current_time - skill.interval) % skill.interval)) <= (music_time - 3))
    )
  }

  private is_just_activated(current_time: number, skill: Skill, music_time: number): boolean {
    return (
      (current_time >= skill.interval) &&
      (((current_time - skill.interval) % skill.interval) === 0) &&
      (current_time <= (music_time - 3))
    )
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

  private updateTimeLine(current_time: number, skills: Skill[], music_time: number, is_resonance: boolean) : Data {
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
      this.no_miss_time += 0.5
    } else if (is_guard === true) {
      /* change to guard mode */
      this.change_simple_mode("g", current_time)
      this.no_miss_time += 0.5
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

  private update (skills: Skill[], music_time: number, is_resonance: boolean): void {
    this.last_activated_skill_id = -1
    this.current_encore_id_list = [-1, -1, -1, -1, -1]

    this.simple_timeline = []
    this.simple_start_time = 0.0
    this.simple_previous_mode = ""

    this.perfect_time = 0
    this.perfect_ratio = 0
    this.no_miss_time = 0
    this.no_miss_ratio = 0

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
    this.no_miss_ratio = this.no_miss_time / music_time * 100

    this.time_ratio = [{
      perfect_time: this.perfect_time.toFixed(1),
      perfect_ratio: this.perfect_ratio.toFixed(1),
      no_miss_time: this.no_miss_time.toFixed(1),
      no_miss_ratio: this.no_miss_ratio.toFixed(1)
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

  private handleChangeMusicTime = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    let new_music_time: number = Number(e.target.value)
    this.setState({music_time: new_music_time})
    this.update(this.state.skills, new_music_time, this.state.is_resonance)
  }

  render() {
    const idolColumns : Column<IdolsData>[] = [
        { Header: "アイドル4特技", accessor: "idol4" },
        { Header: "アイドル2特技", accessor: "idol2" },
        { Header: "アイドル1特技", accessor: "idol1" },
        { Header: "アイドル3特技", accessor: "idol3" },
        { Header: "アイドル5特技", accessor: "idol5" },
      ]
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
    const simple_columns : Column<SimpleData>[] = [
        { Header: "経過時間（秒）", accessor: "start" },
        { Header: "判定", accessor: "mode" },
        { Header: "継続時間（秒）", accessor: "time" },
      ]
    const time_ratio_columns : Column<TimeRatioData>[] = [
        { Header: "PERFECT 時間（秒）", accessor: "perfect_time" },
        { Header: "PERFECT 率（%）", accessor: "perfect_ratio" },
        { Header: "NO MISS 時間（秒）", accessor: "no_miss_time" },
        { Header: "NO MISS 率（%）", accessor: "no_miss_ratio" },
      ]
    this.idolsData = 
      {
        idol1: <Idol skill={this.state.skills[0]} id={1} changeName={this.changeName} changeInterval={this.changeInterval} changeTime={this.changeTime}/>,
        idol2: <Idol skill={this.state.skills[1]} id={2} changeName={this.changeName} changeInterval={this.changeInterval} changeTime={this.changeTime}/>,
        idol3: <Idol skill={this.state.skills[2]} id={3} changeName={this.changeName} changeInterval={this.changeInterval} changeTime={this.changeTime}/>,
        idol4: <Idol skill={this.state.skills[3]} id={4} changeName={this.changeName} changeInterval={this.changeInterval} changeTime={this.changeTime}/>,
        idol5: <Idol skill={this.state.skills[4]} id={5} changeName={this.changeName} changeInterval={this.changeInterval} changeTime={this.changeTime}/>,
      }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const new_is_resonance: boolean = e.target.checked
      this.setState({is_resonance: new_is_resonance})
      this.update(this.state.skills, this.state.music_time, new_is_resonance)
    };

    const CenterList : string[] = [
      "センター効果 レゾナンス・XXX 有効？",
    ]

    const CheckBoxTemplate = ({ id, value, checked = false, onChange } : {id: string, value: string, checked: boolean, onChange: any}) => {
      return (
        <input
        type="checkbox"
        id={id}
        name="center"
        checked={checked}
        onChange={onChange}
        value={value}
        />
      )
    }
    const CheckBox = () => {
      return (
        <>
        {CenterList.map((item, index) => {
          index = index + 1
          return (
            <>
            <label htmlFor="resonance">{item}</label>
            <CheckBoxTemplate
            id={`center_id_${index}`}
            value={item}
            onChange={handleChange}
            checked={this.state.is_resonance}
            />
            </>
          )
        })}
        </>
      )
    }

    return (
      <p>
      {CenterList.map((item, index) => {
        index = index + 1
        return (
          <>
          <CheckBox />
          </>
        )
      })}
      <Table columns={idolColumns} data={[this.idolsData]}/>
      楽曲時間（残り3秒未満になると特技が発動しない）：
      <input
      type="number"
      id="music_time"
      name="music_time"
      onChange={this.handleChangeMusicTime}
      value={this.state.music_time}
      />
      秒
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
          <Table columns={columns} data={this.data}/>
        </label>
      </div>
      </p>
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
          <p>未対応：グランドライブ</p>
        </div>
        <div>
          <p>使ったらシンデレラガールズ総選挙で小早川紗枝に投票しますよね</p>
          <p>挙動がおかしいと思ったり要望があったりしたら<a href="https://github.com/amayav/LifeHelper">ソースコード</a>を自分でいじってね</p>
          <p>ソースコードのライセンスは設けてないよ</p>
        </div>
        <Idols/>
      </div>
  </>
  );
}

export default App;
