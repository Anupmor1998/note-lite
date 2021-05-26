import React from 'react';

function GithubRibbon() {
  return (
    <a href='https://github.com/Anupmor1998/note-lite'>
      <img
        style={{ position: 'absolute', right: '0' }}
        loading='lazy'
        width='149'
        height='149'
        src='https://github.blog/wp-content/uploads/2008/12/forkme_right_orange_ff7600.png?resize=149%2C149'
        className='attachment-full size-full'
        alt='Fork me on GitHub'
        data-recalc-dims='1'
      />
    </a>
  );
}

export default GithubRibbon;
