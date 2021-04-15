export const DateDif = d => {
  const date = new Date(d);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (date.toLocaleDateString() === today.toLocaleDateString()) {
    return 'Today';
  } if (date.toLocaleDateString() === yesterday.toLocaleDateString()) {
    return 'Yesterday';
  }
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
  });
};

export const DateString = s => new Date(s)
  .toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
