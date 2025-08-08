import React, { useContext } from 'react';
import pageContext from '../Context/pages/pageContext';

export default function About() {

    return (
        <div>
            <strong><p>
                About Project:<br />
                My Project is to develop a secure web platform,
                which can help people to manage their personal
                dairies online.
                I have named my project as “My Diary”. It is build using the
                most popular stack of today: ‘MERN’ Stack.<br /><br /><br />
                Technology/Methodology Used:<br /><br />
                ➢ React: React is a node.js library used to develop user
                interfaces that support single page application.
                A single page application is the one which only reloads
                the modified component of the webpage and do not
                perform reloading for rest of the application. This makes
                our application efficient, robust and fast.
                React helps to develop single page application by
                breaking the webpage into user-defined components.<br /><br />
                ➢ Express.js: Express is a node.js framework used to
                develop powerful restful api. It is used to build a single
                page, multipage and hybrid web application. It’s a layer
                built on the top of the Node.js that helps to manage
                servers and routes<br /><br />
                ➢Mongo DB: Mongo DB is a powerful No-SQL database
                that helps us to store data in the form of objects. It
                provides enhanced security and access to our data.<br /><br />
                ➢ Node.js: Node.js is a platform that enables us to use
                javascript outside the web browsers. MERN stack is
                considered one of the powerful stacks as React,
                Express.js and Mongo DB are all based on just one
                language: javascript and can be easily used using
                node.js.<br /><br /><br /><br />
                Features of project:<br /><br />
                ✓ It is fully secure as it uses powerful hashing to encrypt <br />
                password into database.<br />
                ✓ It also uses json web token for user authentication.<br />
                ✓ It does not convey internal information in messages.<br />
                ✓ User can easily access his/her diary<br />
                ✓ It uses powerful login system for authorisation<br />
                <br/>
            </p></strong>
        </div>
    )
}

