import React from 'react';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import AdminPromptItem from '../Item/Item';
import s from './style.module.css';
import AddBtn from '../AddBtn/AddBtn';

function List({ promptList, setPromptList }) {
  return (
    <div>
      <AddBtn list={promptList} setList={setPromptList}/>
      <Table className={s.table}>
        <Thead>
          <Tr>
            <Th className={s.th}>Id</Th>
            <Th className={s.th}>Prompt</Th>
            <Th className={s.th}>Niveau</Th>
          </Tr>
        </Thead>
        <Tbody>
          {promptList?.map((prompt) => (
            <AdminPromptItem 
              key={prompt._id} 
              prompt={prompt} 
              promptList={promptList}
              setPromptList={setPromptList}
            />
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default List;
