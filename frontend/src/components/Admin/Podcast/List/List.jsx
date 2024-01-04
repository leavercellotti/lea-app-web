import React from 'react';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import AdminPodcastItem from '../Item/Item';
import s from './style.module.css';
import AddBtn from '../AddBtn/AddBtn';

function List({ podcastList, setPodcastList }) {
  return (
    <div>
      <AddBtn list={podcastList} setList={setPodcastList}/>
      <Table className={s.table}>
        <Thead>
          <Tr>
            <Th className={s.th}>Id</Th>
            <Th className={s.th}>Titre</Th>
            <Th className={s.th}>Lien podcast</Th>
            <Th className={s.th}>Texte anglais</Th>
            <Th className={s.th}>Texte français</Th>
            <Th className={s.th}>Lien image</Th>
            <Th className={s.th}>Niveau</Th>
          </Tr>
        </Thead>
        <Tbody>
          {podcastList?.map((podcast) => (
            <AdminPodcastItem 
              key={podcast._id} 
              podcast={podcast} 
              podcastList={podcastList}
              setPodcastList={setPodcastList}
            />
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default List;
