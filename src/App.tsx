import React, {useMemo, useState} from 'react';
import { useTable, Column } from 'react-table';
import logo from './logo.svg';
import './App.css';

export interface Data {
  start: string;
  end: string;
  idol1: string;
  idol2: string;
  idol3: string;
  idol4: string;
  idol5: string;
  perfect: string;
  guard: string;
}

function Table ({ columns, data } : { columns: Column<Data>[], data: Data[] } ) : any {
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
    const n = `アイドル${this.props.id}特技`

    return (
        <p>
          <label htmlFor={`skill_id_${this.props.id}`}>{n}
            <select name={`skill_name_${this.props.id}`} id={`skill_id_${this.props.id}`} onChange={this.handleListBoxNameChange} value={this.props.skill.name}>
              <option value={PERFECT_SUPPORT_3}>SSR パーフェクトサポート</option>
              <option value={PERFECT_SUPPORT_2}>SSR チューニング or SR パーフェクトサポート</option>
              <option value={PERFECT_SUPPORT_1}>R パーフェクトサポート</option>
              <option value={DAMAGE_GUARD}>SR ダメージガード</option>
              <option value={SKILL_BOOST}>スキルブースト or トリコロール・シンフォニー</option>
              <option value={ENCORE}>アンコール</option>
              <option value={CINDERELLA_MAGIC}>シンデレラマジック</option>
              <option value={OTHER}>その他</option>
            </select>
          </label>

        <input type="number" id={`interval_id_${this.props.id}`} name={`interval_name_${this.props.id}`} min="1" placeholder="4" onChange={this.handleInputBoxIntervalChange} value={this.props.skill.interval}/>
        秒ごと

          <select name={`time_name_${this.props.id}`} id={`time_id_${this.props.id}`} onChange={this.handleListBoxTimeChange} value={this.props.skill.time}>
          <option value="time_a">一瞬の間</option>
          <option value="time_b">わずかな間</option>
          <option value="time_c">少しの間</option>
          <option value="time_d">しばらくの間</option>
          <option value="time_e">かなりの間</option>
        </select>
      </p>
    )
  }
}

export class Idols extends React.Component <{}, {skills: Skill[]}> {
  constructor(props: any) {
    super(props)
    const default_skill : Skill = {
      name: PERFECT_SUPPORT_3,
      interval: 8,
      time: "time_b"
    }
    this.state = {
      skills: [default_skill, default_skill, default_skill, default_skill, default_skill]
    }
    this.changeName = this.changeName.bind(this)
    this.changeInterval = this.changeInterval.bind(this)
    this.changeTime = this.changeTime.bind(this)
  }

  data : Data[] = [
    {start: "*",
      end:"*",
      idol1:"*",
      idol2:"*",
      idol3:"*",
      idol4:"*",
      idol5:"*",
      perfect:"*",
      guard:"*"
    }
  ]

  protected updateTimeLine(start_time: number, skills: Skill[]) : Data {
    let last_fired_skill: number = 0
    let current_encore_list: number[] = [0, 0, 0, 0, 0]

    const calc = (start_time: number): Data => {

      function is_firing(start_time: number, skill: Skill): boolean {
        return (
          ((start_time - skill.interval) >= 0) &&
          (((start_time - skill.interval) % skill.interval) <= skillTimes[skill.time])
        )
      }

      function is_just_fired(start_time: number, skill: Skill): boolean {
        return (
          ((start_time - skill.interval) >= 0) &&
          (((start_time - skill.interval) % skill.interval) == 0)
        )
      }

      function is_perfect_support_3_firing(skill: Skill): boolean {
        return is_firing(start_time, skill) && (skill.name == PERFECT_SUPPORT_3)
      }

      function is_skill_up_firing(skill: Skill): boolean {
        return is_firing(start_time, skill) && (skill.name == SKILL_BOOST)
      }

      function is_guard_firing(skill: Skill, id: number): boolean {
        return (
          is_firing(start_time, skill) &&
          ((skill.name == DAMAGE_GUARD) || (skill.name == ENCORE) && (eval("s.skill" + current_encore_list[id-1]) == DAMAGE_GUARD))
        )
      }

      function is_guard(): boolean {
        return (
          (is_guard_firing(skills[0], 1) ||
            is_guard_firing(skills[1], 2) ||
            is_guard_firing(skills[2], 3) ||
            is_guard_firing(skills[3], 4) ||
            is_guard_firing(skills[4], 5))
        )
      }

      let being_fired_skills_name: string[] = []

      for (let i=4; i>=0; i--) {
        if (is_firing(start_time, skills[i])) {
          if (skills[i].name != ENCORE) {
            being_fired_skills_name.push(skills[i].name)
          } else {
            being_fired_skills_name.push(skills[current_encore_list[i]].name)
          }
        }
        if (is_just_fired(start_time, skills[i])) {
          if (skills[i].name != ENCORE) {
            last_fired_skill = i
          } else {
            if (last_fired_skill != 0) { // at least one skills other than encore are fired 
              current_encore_list[i] = last_fired_skill
            }
          }
        }
      }

      function is_perfect(): boolean {
        let perfect_3_counter: number = 0
        let skill_boost_counter: number = 0
        for (let i=0; i<5; i++) {
          if (being_fired_skills_name[i] == PERFECT_SUPPORT_3) {
            perfect_3_counter++
          } else if (being_fired_skills_name[i] == SKILL_BOOST) {
            skill_boost_counter++
          }
        }
        return ((perfect_3_counter > 0) && (skill_boost_counter > 0))
      }

      return {
        start: start_time.toFixed(1),
        end: (start_time + 0.5).toFixed(1),
        idol1: is_firing(start_time, skills[0]) ? ((skills[0].name != ENCORE) ? "1" : current_encore_list[0].toFixed(0)) : "",
        idol2: is_firing(start_time, skills[1]) ? ((skills[1].name != ENCORE) ? "2" : current_encore_list[1].toFixed(0)) : "",
        idol3: is_firing(start_time, skills[2]) ? ((skills[2].name != ENCORE) ? "3" : current_encore_list[2].toFixed(0)) : "",
        idol4: is_firing(start_time, skills[3]) ? ((skills[3].name != ENCORE) ? "4" : current_encore_list[3].toFixed(0)) : "",
        idol5: is_firing(start_time, skills[4]) ? ((skills[4].name != ENCORE) ? "5" : current_encore_list[4].toFixed(0)) : "",
        perfect: is_perfect() ? "p" : "-",
        guard: is_guard() ? "g" : "-",
      }
    };

    return calc(start_time)
  };

  update (id: number, skill: Skill) {
    let new_skills : Skill[] = this.state.skills
    new_skills[id-1] = skill
    this.setState({skills: new_skills})
      /*
    const timeList : number[] = [...Array(120*2)].map((_i, i) => i/2)
    this.data = this.updateTimeLine(timeList, new_skills)
      */
    const timeList : number[] = [...Array(120*2)].map((_i, i) => i/2)
    this.data = timeList.map(startTime => {
      return this.updateTimeLine(startTime, new_skills)
    })
  }

  changeName (id: number, name: string) {
    let new_skill = {...this.state.skills[id-1], name: name}
    this.update(id, new_skill)
  }

  changeInterval (id: number, interval: number) {
    let new_skill: Skill = {...this.state.skills[id-1], interval: interval}
    this.update(id, new_skill)
  }

  changeTime (id: number, time: string) {
    let new_skill: Skill = {...this.state.skills[id-1], time: time}
    this.update(id, new_skill)
  }

  render() {
    const columns : Column<Data>[] = [
        { Header: "start", accessor: "start" },
        { Header: "end", accessor: "end" },
        { Header: "4", accessor: "idol4" },
        { Header: "2", accessor: "idol2" },
        { Header: "1", accessor: "idol1" },
        { Header: "3", accessor: "idol3" },
        { Header: "5", accessor: "idol5" },
        { Header: "perfect", accessor: "perfect" },
        { Header: "guard", accessor: "guard" },
      ]
    return (
      <p>
        {<Idol skill={this.state.skills[3]} id={4} changeName={this.changeName} changeInterval={this.changeInterval} changeTime={this.changeTime}/>}
        {<Idol skill={this.state.skills[1]} id={2} changeName={this.changeName} changeInterval={this.changeInterval} changeTime={this.changeTime}/>}
        {<Idol skill={this.state.skills[0]} id={1} changeName={this.changeName} changeInterval={this.changeInterval} changeTime={this.changeTime}/>}
        {<Idol skill={this.state.skills[2]} id={3} changeName={this.changeName} changeInterval={this.changeInterval} changeTime={this.changeTime}/>}
        {<Idol skill={this.state.skills[4]} id={5} changeName={this.changeName} changeInterval={this.changeInterval} changeTime={this.changeTime}/>}
        {/*{idolList[0].render()}*/}
        music time
        <Table columns={columns} data={this.data}/>
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
  interface Props {
    checked?: boolean;
  }

  const [val, setVal] = React.useState([""]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (val.includes(e.target.value)) {
      setVal(val.filter(item => item !== e.target.value));
    } else {
      setVal([...val, e.target.value]);
    }
  };

  const CenterList : string[] = [
    "レゾナンス",
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
          id={`id_${index}`}
          value={item}
          onChange={handleChange}
          checked={val.includes(item)}
          />
          </>
        )
      })}
      </>
    )
  }

  return (
    <>
    <div className="App">
    {
    /*<header className="App-header">
       {<img src={logo} className="App-logo" alt="logo" />}
       <p>
       Edit <code>src/App.tsx</code> and save to reload.
       </p>
       <a
       className="App-link"
       href="https://reactjs.org"
       target="_blank"
       rel="noopener noreferrer"
       >
       Learn React
       </a>
       </header>*/
    }

    {CenterList.map((item, index) => {
      index = index + 1
      return (
        <>
        <CheckBox />
        </>
      )
    })}
    <p>
  </p>
  {<Idols/>}
    </div>
    </>
  );
}

export default App;
