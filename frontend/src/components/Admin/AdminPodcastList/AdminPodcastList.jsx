import React from 'react';
import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table';
import AdminPodcastItem from '../AdminPodcastItem/AdminPodcastItem';
import s from './style.module.css';

function AdminPodcastList({ podcastList }) {
  return (
    <Table className={s.table}>
      <Thead>
        <Tr>
          <Th className={s.th}>Id</Th>
          <Th className={s.th}>Titre</Th>
          <Th className={s.th}>Lien du podcast</Th>
          <Th className={s.th}>Texte anglais</Th>
          <Th className={s.th}>Texte français</Th>
          <Th className={s.th}>Lien de l'image</Th>
          <Th className={s.th}>Niveau</Th>
        </Tr>
      </Thead>
      <Tbody>
        {podcastList?.map((podcast) => (
          <AdminPodcastItem key={podcast._id} podcast={podcast} />
        ))}
      </Tbody>
    </Table>
  );
}

export default AdminPodcastList;
