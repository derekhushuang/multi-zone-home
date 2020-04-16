import React from 'react'
import Title from "../components/Title";
import { Header } from "@aaxis/share-components";

export default () => (
  <div>
    <Header />
    <Title />
    <div>
        <a href='/blog'>Blog</a>
    </div>
    <div>
        <a href="/about">About us</a>
    </div>
  </div>
);
