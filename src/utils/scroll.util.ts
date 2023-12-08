const previousOverflow: string[] = [];
const previousPaddingRight: string[] = [];

/**
 * Toggle the body scroll / overflow and additional styling
 * necessary to preserve scroll position and body width (scrollbar replacement)
 */
export default function preventBodyHorizontalScroll(prevent: boolean) {
  /** Get the width before toggling the style so we can calculate the scrollbar width for a smooth, jankless style change */
  const { width } = document.body.getBoundingClientRect();

  /** Apply or remove overflowY style */
  if (prevent) {
    previousOverflow.push(document.body.style.overflowY);
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = previousOverflow.pop() || "";
  }

  /** Get the _new width_ of the body (this will tell us the scrollbar width) */
  const newWidth = document.body.getBoundingClientRect().width;
  const scrollBarWidth = newWidth - width;

  /** If there's a diff due to scrollbars, then account for it with padding */
  if (prevent) {
    previousPaddingRight.push(document.body.style.paddingRight);
    document.body.style.paddingRight = Math.max(0, scrollBarWidth || 0) + "px";
  } else {
    document.body.style.paddingRight = previousPaddingRight.pop() || "";
  }
}
