
'use client'

import UserDashboardView from "./_components/UserDashboardView";
import type { View } from './_components/UserDashboardView';

interface DashboardPageProps {
    view: View;
    setView: (view: View) => void;
}

export default function DashboardPage({ view, setView }: DashboardPageProps) {
    return <UserDashboardView view={view} setView={setView} />;
}
