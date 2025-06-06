import { useMemo } from "react";
import useLinksCount from "./use-links-count";

export function useFolderLinkCount({ folderId }: { folderId: string | null }) {
  const { data: folderLinksCount, loading } = useLinksCount<
    {
      folderId: string;
      _count: number;
    }[]
  >({ query: { groupBy: "folderId" }, ignoreParams: true });

  const folderLinkCount = useMemo(() => {
    return (
      folderLinksCount?.find(
        ({ folderId: id }) =>
          id === folderId || (id === null && folderId === "unsorted"),
      )?._count || 0
    );
  }, [folderLinksCount, folderId]);

  return { folderLinkCount, loading };
}
