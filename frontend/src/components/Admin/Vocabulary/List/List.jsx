import React from 'react';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import AdminCardItem from '../Item/Item';
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
            <Th className={s.th}>Mot anglais</Th>
            <Th className={s.th}>Mot français</Th>
            <Th className={s.th}>Niveau</Th>
            <Th className={s.th}>Phrase 1</Th>
            <Th className={s.th}>Phrase 2</Th>
            <Th className={s.th}>Phrase 3</Th>          
          </Tr>
        </Thead>
        <Tbody>
          {list?.map((item) => (
            <AdminCardItem 
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
