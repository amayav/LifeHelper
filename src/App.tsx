import React, {useMemo, useState} from 'react';
import { useTable, Column } from 'react-table';
import logo from './logo.svg';
import './App.css';

  interface Data {
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

let data : Data[] = [
  {start: "0",
 end:"0",
 idol1:"3",
 idol2:"4",
 idol3:"5",
 idol4:"6",
 idol5:"7",
 perfect:"8",
 guard:"9"
  }
]

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

function App() {
  interface Props {
    checked?: boolean;
  }

  const SkillList : string[] = React.useMemo (
    () => [
    "アイドル1特技",
    "アイドル2特技",
    "アイドル3特技",
    "アイドル4特技",
    "アイドル5特技",
  ],
  []
  )

  const numList : number[] = [...Array(5)].map((_i, i) => i)
  const list2 : string[] = numList.map((_i, i) => {
    return "val_${i}"
  });

  const [val2, setVal2] = React.useState<string>();
  const [val2_1, setVal2_1] = React.useState<string>();
  const [val2_2, setVal2_2] = React.useState<string>();
  const [val2_3, setVal2_3] = React.useState<string>();
  const [val2_4, setVal2_4] = React.useState<string>();
  const [val2_5, setVal2_5] = React.useState<string>();

  const timeList : number[] = [...Array(120*2)].map((_i, i) => i/2)


  const handleListBoxChange_1 = (e: React.ChangeEvent<HTMLInputElement>, id: number) : void => {
    setVal2_1(e.target.value);
    data = timeList.map(start_time => {
      return {
        start: start_time.toFixed(1),
        end: (start_time + 0.5).toFixed(1),
        idol1: (start_time % 4 <= 3) ? "*" : "",
        idol2: (start_time % 7 <= 6) ? "*" : "",
        idol3: (start_time % 9 <= 4.5) ? "*" : "",
        idol4: (start_time % 11 <= 7) ? "*" : "",
        idol5: (start_time % 18 <= 9) ? "*" : "",
        perfect: e.target.value,
        guard: "+",
      }
    });
  }

  const handleListBoxChange_2 = (e: React.ChangeEvent<HTMLInputElement>, id: number) : void => {
    setVal2_2(e.target.value);
    data = timeList.map(start_time => {
      return {
        start: start_time.toFixed(1),
        end: (start_time + 0.5).toFixed(1),
        idol1: (start_time % 4 <= 3) ? "*" : "",
        idol2: (start_time % 7 <= 6) ? "*" : "",
        idol3: (start_time % 9 <= 4.5) ? "*" : "",
        idol4: (start_time % 11 <= 7) ? "*" : "",
        idol5: (start_time % 18 <= 9) ? "*" : "",
        perfect: e.target.value,
        guard: "+",
      }
    });
  }

  const handleListBoxChange_3 = (e: React.ChangeEvent<HTMLInputElement>, id: number) : void => {
    setVal2_3(e.target.value);
    data = timeList.map(start_time => {
      return {
        start: start_time.toFixed(1),
        end: (start_time + 0.5).toFixed(1),
        idol1: (start_time % 4 <= 3) ? "*" : "",
        idol2: (start_time % 7 <= 6) ? "*" : "",
        idol3: (start_time % 9 <= 4.5) ? "*" : "",
        idol4: (start_time % 11 <= 7) ? "*" : "",
        idol5: (start_time % 18 <= 9) ? "*" : "",
        perfect: e.target.value,
        guard: "+",
      }
    });
  }

  const handleListBoxChange_4 = (e: React.ChangeEvent<HTMLInputElement>, id: number) : void => {
    setVal2_4(e.target.value);
    data = timeList.map(start_time => {
      return {
        start: start_time.toFixed(1),
        end: (start_time + 0.5).toFixed(1),
        idol1: (start_time % 4 <= 3) ? "*" : "",
        idol2: (start_time % 7 <= 6) ? "*" : "",
        idol3: (start_time % 9 <= 4.5) ? "*" : "",
        idol4: (start_time % 11 <= 7) ? "*" : "",
        idol5: (start_time % 18 <= 9) ? "*" : "",
        perfect: e.target.value,
        guard: "+",
      }
    });
  }

  const handleListBoxChange_5 = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    setVal2_5(e.target.value);
    data = timeList.map(start_time => {
      return {
        start: start_time.toFixed(1),
        end: (start_time + 0.5).toFixed(1),
        idol1: (start_time % 4 <= 3) ? "*" : "",
        idol2: (start_time % 7 <= 6) ? "*" : "",
        idol3: (start_time % 9 <= 4.5) ? "*" : "",
        idol4: (start_time % 11 <= 7) ? "*" : "",
        idol5: (start_time % 18 <= 9) ? "*" : "",
        perfect: e.target.value,
        guard: "+",
      }
    });
  }

  const handleListBoxChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    setVal2(e.target.value);
    data = timeList.map(start_time => {
      return {
        start: start_time.toFixed(1),
        end: (start_time + 0.5).toFixed(1),
        idol1: (start_time % 4 <= 3) ? "*" : "",
        idol2: (start_time % 7 <= 6) ? "*" : "",
        idol3: (start_time % 9 <= 4.5) ? "*" : "",
        idol4: (start_time % 11 <= 7) ? "*" : "",
        idol5: (start_time % 18 <= 9) ? "*" : "",
        perfect: e.target.value,
        guard: "+",
      }
    });
  }

  const SkillListBoxTemplate = ({id, onChange} : {id: number, onChange: any}) => {
    return (
      <>
      <select name={`skill_name_${id}`} id={`skill_id_${id}`} onChange={onChange} value={val2}>
      <option value="perfect_support">SSR パーフェクトサポート</option>
      <option value="tuning">SSR チューニング</option>
      <option value="damage_guard">SR ダメージガード</option>
      <option value="skill_boost">特技アップ1</option>
      <option value="skill_boost">特技アップ2</option>
      <option value="encore">アンコール</option>
      <option value="cinderella_magic">シンデレラマジック</option>
      <option value="other">その他</option>
      </select>

      <input type="number" id={`period_id_${id}`} name={`period_name_${id}`} min="1" placeholder="1"/>
      秒ごと

      <select name={`time_name_${id}`} id={`time_id_${id}`}>
      <option value="time_a">一瞬の間</option>
      <option value="time_b">わずかな間</option>
      <option value="time_c">少しの間</option>
      <option value="time_d">しばらくの間</option>
      <option value="time_e">かなりの間</option>
      </select>

      </>
    )
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

  const columns : Column<Data>[] = React.useMemo(
    () => [
    {
      Header: "start",
      accessor: "start"
    },
    {
      Header: "end",
      accessor: "end"
    },
    {
      Header: "4",
      accessor: "idol4"
    },
    {
      Header: "2",
      accessor: "idol2"
    },
    {
      Header: "1",
      accessor: "idol1"
    },
    {
      Header: "3",
      accessor: "idol3"
    },
    {
      Header: "5",
      accessor: "idol5"
    },
    {
      Header: "perfect",
      accessor: "perfect"
    },
    {
      Header: "guard",
      accessor: "guard"
    },
  ],
  []
  )

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
 
    {SkillList.map((item, index) => {
      index = index + 1
      return (
        <>
        <p>
        <label htmlFor={`skill_id_${index}`}>{item}</label>
        <SkillListBoxTemplate
        id={index}
        onChange={handleListBoxChange}
        />
        </p>
        </>
      )
    })
    }
    /*`*/

      <Table columns={columns} data={data}/>
    {
    /*
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
*/
    }
    </div>
    </>
  );
}

export default App;
