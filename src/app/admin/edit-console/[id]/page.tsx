
export const runtime = 'edge';
import { AdminEditConsoleView } from "../../_components/AdminEditConsoleView";

export default function AdminEditConsolePage({ params }: { params: { id: string } }) {
    return <AdminEditConsoleView consoleId={params.id} />;
}
