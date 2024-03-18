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
            <Th className={s.th}>Nom</Th>
            <Th className={s.th}>Email</Th>
            <Th className={s.th}>Id Client Stripe</Th>
            <Th className={s.th}>Id Abonnement Stripe</Th>
            <Th className={s.th}>Abonnement</Th>
            <Th className={s.th}>Inscription</Th>
            <Th className={s.th}>Renouvellement</Th>
            <Th className={s.th}>Niveau</Th>
            <Th className={s.th}>Nombre de mots</Th> 
            <Th className={s.th}>Nombre de pratiques</Th>
            <Th className={s.th}>Nombre de podcasts écoutés</Th>         
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
