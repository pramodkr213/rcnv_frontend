export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" }); // e.g. "May"
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
