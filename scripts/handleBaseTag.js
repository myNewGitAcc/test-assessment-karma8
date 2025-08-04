const base = document.createElement('base');
base.href = '/';

if (location.hostname === 'mynewgitacc.github.io') {
  base.href = '/test-assessment-karma8/';
}

document.head.prepend(base);
