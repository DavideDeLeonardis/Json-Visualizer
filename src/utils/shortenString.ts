export default (string: string, length = 200): string => {
   if (string.length > length) string = string.substring(0, length) + '...';
   return string;
};
