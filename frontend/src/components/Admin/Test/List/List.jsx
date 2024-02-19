import React from 'react';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import AdminItem from '../Item/Item';
import s from './style.module.css';
import AddBtn from '../AddBtn/AddBtn';

function List({ list, setList }) {
  return (
    <div>
      <AddBtn list={list} setList={setList}/>
      <Table className={s.table}>
        <Thead>
          <Tr>
            <Th className={s.th}>Id</Th>
            <Th className={s.th}>Phrase</Th>
            <Th className={s.th}>Réponse</Th>
            <Th className={s.th}>Option a</Th>
            <Th className={s.th}>Option b</Th>
            <Th className={s.th}>Option c</Th>
            <Th className={s.th}>Option d</Th> 
          </Tr>
        </Thead>
        <Tbody>
          {list?.map((item) => (
            <AdminItem 
              key={item._id} 
              item={item} 
              list={list}
              setList={setList}
            />
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default List;
