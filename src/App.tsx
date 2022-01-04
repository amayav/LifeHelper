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

function IdolsTable ({ columns, data } : { columns: Column<IdolsData>[], data: IdolsData[] } ) : any {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable<IdolsData>({ columns, data });

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

function TimeLineTable ({ columns, data } : { columns: Column<Data>[], data: Data[] } ) : any {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable<Data>({ columns, data });

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

function SimpleTimeLineTable ({ columns, data } : { columns: Column<SimpleData>[], data: SimpleData[] } ) : any {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable<SimpleData>({ columns, data });

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
      time: "time_b"
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

  simple_timeline: SimpleData[] = []
  simple_start_time: number = 0.0
  simple_end_time: number = -1
  simple_previous_mode: string = ""
  private getSimpleTimeLine(): SimpleData[] {
    return this.simple_timeline
  }

  private updateTimeLine(current_time: number, skills: Skill[], music_time: number, is_resonance: boolean) : Data {
    function is_activated(current_time: number, skill: Skill): boolean {
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

    function is_just_activated(current_time: number, skill: Skill): boolean {
      return (
        (current_time >= skill.interval) &&
        (((current_time - skill.interval) % skill.interval) === 0) &&
        (current_time <= (music_time - 3))
      )
    }

    let being_activated_skills_name: string[] = []

    /* define skill encore uses */
    for (let i=4; i>=0; i--) {
      if ((skills[i].name === ENCORE) &&
        (is_just_activated(current_time, skills[i])) &&
        (this.last_activated_skill_id !== -1)) {
        this.current_encore_id_list[i] = this.last_activated_skill_id
      }
    }

    /* listing up activated skills */
    for (let i=4; i>=0; i--) {
      if (!is_activated(current_time, skills[i])) {
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
        if (is_just_activated(current_time, skills[i])) {
          this.last_activated_skill_id = i
        }
      }
    }

    function is_perfect(is_resonance: boolean): boolean {
      if (is_resonance === false) {
        return being_activated_skills_name.includes(PERFECT_SUPPORT_3) &&
          being_activated_skills_name.includes(SKILL_BOOST)
      }
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
      return (total_perfect_support_count >= 4)
    }

    function is_guard(): boolean {
      return being_activated_skills_name.includes(DAMAGE_GUARD)
    }

    function display(id: number, encore_id: number): string {
      if (! is_activated(current_time, skills[id])) {
        return ""
      } else if (skills[id].name === ENCORE) {
        if (encore_id !== -1) { // encore doesn't activate if no other skills have been activated
          if (skills[encore_id].name === CINDERELLA_MAGIC) {
            return "12345"
          } else {
            return (encore_id + 1).toFixed(0)
          }
        } else {
          return ""
        }
      } else if (skills[id].name === CINDERELLA_MAGIC) {
        return "12345"
      } else {
        return (id + 1).toFixed(0)
      }
    }

    const p: boolean = is_perfect(is_resonance);
    const g: boolean = is_guard();
    if (p === true) {
      if ((this.simple_previous_mode === "") ||
          (this.simple_previous_mode === "g")) {
        /* change to perfect mode */
        this.simple_end_time = current_time;
        this.simple_timeline.push({start: (this.simple_start_time.toFixed(1) + " - " + this.simple_end_time.toFixed(1)), time: (this.simple_end_time - this.simple_start_time).toFixed(1), mode: this.simple_previous_mode});
        this.simple_previous_mode = "p";
        this.simple_start_time = current_time;
      }
      /* else continue perfect mode */
    } else if (g === true) {
      if ((this.simple_previous_mode === "") ||
          (this.simple_previous_mode === "p")) {
        /* change to guard mode */
        this.simple_end_time = current_time;
        this.simple_timeline.push({start: (this.simple_start_time.toFixed(1) + " - " + this.simple_end_time.toFixed(1)), time: (this.simple_end_time - this.simple_start_time).toFixed(1), mode: this.simple_previous_mode});
        this.simple_previous_mode = "g";
        this.simple_start_time = current_time;
      }
      /* else continue guard mode */
    } else {
      if ((this.simple_previous_mode === "p") ||
          (this.simple_previous_mode === "g")) {
        /* change to miss mode */
        this.simple_end_time = current_time;
        this.simple_timeline.push({start: (this.simple_start_time.toFixed(1) + " - " + this.simple_end_time.toFixed(1)), time: (this.simple_end_time - this.simple_start_time).toFixed(1), mode: this.simple_previous_mode});
        this.simple_previous_mode = "";
        this.simple_start_time = current_time;
      }
      /* else continue miss mode */
    }
    /* process at the end of music time is out of this function */

    return {
      start: current_time.toFixed(1) + " - " + (current_time + 0.5).toFixed(1),
      idol1: display(0, this.current_encore_id_list[0]),
      idol2: display(1, this.current_encore_id_list[1]),
      idol3: display(2, this.current_encore_id_list[2]),
      idol4: display(3, this.current_encore_id_list[3]),
      idol5: display(4, this.current_encore_id_list[4]),
      perfect: p ? "p" : "-",
      guard: g ? "g" : "-",
    }
  };

  private update (id: number, skill: Skill, music_time: number, is_resonance: boolean): void {
    let new_skills : Skill[] = this.state.skills
    new_skills[id-1] = skill
    this.setState({skills: new_skills})

    this.last_activated_skill_id = -1
    this.current_encore_id_list = [-1, -1, -1, -1, -1]

    this.simple_timeline = []
    this.simple_start_time = 0.0
    this.simple_end_time = -1
    this.simple_previous_mode = ""

    const timeList : number[] = [...Array(music_time*2)].map((_i, i) => i/2)

    this.data = timeList.map(startTime => {
      return this.updateTimeLine(startTime, new_skills, music_time, is_resonance)
    })

    this.simple_timeline.push({start: this.simple_start_time.toFixed(1) + " - " + this.simple_end_time.toFixed(1), time: (this.simple_end_time - this.simple_start_time).toFixed(1), mode: this.simple_previous_mode})
  }

  private changeName (id: number, name: string) {
    let new_skill = {...this.state.skills[id-1], name: name}
    this.update(id, new_skill, this.state.music_time, this.state.is_resonance)
  }

  private changeInterval (id: number, interval: number) {
    let new_skill: Skill = {...this.state.skills[id-1], interval: interval}
    this.update(id, new_skill, this.state.music_time, this.state.is_resonance)
  }

  private changeTime (id: number, time: string) {
    let new_skill: Skill = {...this.state.skills[id-1], time: time}
    this.update(id, new_skill, this.state.music_time, this.state.is_resonance)
  }

  private handleChangeMusicTime = (e: React.ChangeEvent<HTMLInputElement>) : any => {
    let new_music_time: number = Number(e.target.value)
    this.setState({music_time: new_music_time})
    this.update(0, this.state.skills[0], new_music_time, this.state.is_resonance)
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
        { Header: "継続時間（秒）", accessor: "time" },
        { Header: "モード", accessor: "mode" },
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
      this.update(0, this.state.skills[0], this.state.music_time, new_is_resonance)
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
      <IdolsTable columns={idolColumns} data={[this.idolsData]}/>
      楽曲時間（残り3秒未満になると特技が発動しない）：
      <input
      type="number"
      id="music_time"
      name="music_time"
      onChange={this.handleChangeMusicTime}
      value={this.state.music_time}
      />
      秒
      {/*checked={checked}*/}
      <div className="tables">
      <div className="table simple">
      <SimpleTimeLineTable columns={simple_columns} data={this.simple_timeline}/>
      </div>
      <div className="table detailed">
      <TimeLineTable columns={columns} data={this.data}/>
      </div>
      </div>
      </p>
    )
  }
}

let skillTimes: { [key: string]: number } = {
  'time_a': 3.0,
  'time_b': 4.5,
  'time_c': 6.0,
  'time_d': 7.5,
  'time_e': 9.0,
};

function App() {
  return (
    <>
    <div className="App">
    <div>
    {<p>アイドルマスター スターリットシーズン好評発売中！</p>}
    {<p>シンデレラガールズ総選挙で小早川紗枝に投票してくれますよね</p>}
    </div>
    <div>
    {<p>チューニング は SR パーフェクトサポート と同じ</p>}
    {<p>トリコロール・シンフォニー は スキルブースト と同じ</p>}
    {<p>未対応：グランドライブ, 強制パーフェクト率・時間計算, 強制パーフェクト + ダメージガード率・時間計算</p>}
    </div>
  {<Idols/>}
    </div>
    </>
  );
}

export default App;
