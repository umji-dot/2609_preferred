import { useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminLayout } from 'fms-staff-design-system';
import type { LNBMenuItem } from 'fms-staff-design-system';

const MENU_ITEMS: LNBMenuItem[] = [
  {
    id: 'vehicle',
    label: '차량관리',
    children: [
      { id: 'car-codes', label: '카코드 관리' },
      { id: 'vehicles', label: '차량 관리' },
      { id: 'push-history', label: '푸시 알림 발송 이력' },
    ],
  },
  {
    id: 'field-service',
    label: '현장서비스',
    children: [{ id: 'field-service-list', label: '현장서비스' }],
  },
  {
    id: 'system',
    label: '시스템',
    children: [{ id: 'settings', label: '설정' }],
  },
];

const ROUTE_BY_SUB_ID: Record<string, string> = {
  'car-codes': '/car-codes',
  vehicles: '/vehicles',
  'push-history': '/push-history',
  'field-service-list': '/field-service',
  settings: '/settings',
};

const ACTIVE_BY_PATH: Record<string, { parent: string; sub: string }> = {
  '/car-codes': { parent: 'vehicle', sub: 'car-codes' },
  '/vehicles': { parent: 'vehicle', sub: 'vehicles' },
  '/push-history': { parent: 'vehicle', sub: 'push-history' },
  '/field-service': { parent: 'field-service', sub: 'field-service-list' },
  '/settings': { parent: 'system', sub: 'settings' },
};

export interface AdminShellProps {
  children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const active = ACTIVE_BY_PATH[location.pathname];

  const [expandedMenuIds, setExpandedMenuIds] = useState<string[]>(['vehicle']);

  const handleMenuClick = (menuId: string) => {
    setExpandedMenuIds((prev) => (prev.includes(menuId) ? [] : [menuId]));
  };

  const handleSubMenuClick = (_menuId: string, subMenuId: string) => {
    const route = ROUTE_BY_SUB_ID[subMenuId];
    if (route) navigate(route);
  };

  return (
    <AdminLayout
      lnb={{
        logoText: 'FMS Admin',
        userName: 'SYS_ADMIN · 관리자',
        menuItems: MENU_ITEMS,
        activeMenuId: active?.parent,
        activeSubMenuId: active?.sub,
        expandedMenuIds,
        onMenuClick: handleMenuClick,
        onSubMenuClick: handleSubMenuClick,
      }}
    >
      {children}
    </AdminLayout>
  );
}
