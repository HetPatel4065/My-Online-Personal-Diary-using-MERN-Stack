import React from 'react';
import AddPage from './AddPage';
import Pages from './Pages'

export default function Home() {

    return (
        <div className='my-4'>
            <h1><strong>Welcome..Your Diary is waiting for you...</strong></h1>
            <Pages />
        </div>
    )
}
