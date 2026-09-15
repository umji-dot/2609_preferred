import { useState } from 'react';
import { Box, Stack, Pagination } from 'fms-staff-design-system';
import { AdminShell } from '../components/AdminShell';
import { VehicleFilterBar } from '../features/vehicle/components/VehicleFilterBar';
import { VehicleTable } from '../features/vehicle/components/VehicleTable';
import { VehicleEditModal } from '../features/vehicle/components/VehicleEditModal';
import { VehicleRegisterModal } from '../features/vehicle/components/VehicleRegisterModal';
import { VehicleLocationModal } from '../features/vehicle/components/VehicleLocationModal';
import { VEHICLE_ROWS, VEHICLE_TOTAL_COUNT } from '../features/vehicle/mocks';
import type { VehicleRow } from '../features/vehicle/mocks';
import { LIST_PAGE_SIZE } from '../components/ui-rules';

const TOTAL_PAGES = Math.ceil(VEHICLE_TOTAL_COUNT / LIST_PAGE_SIZE);

export default function VehicleListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [editRow, setEditRow] = useState<VehicleRow | null>(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [locationRow, setLocationRow] = useState<VehicleRow | null>(null);

  return (
    <AdminShell>
      <Box padding={24}>
        <Stack direction="column">
          <Box as="h1" className="text-page-title text-gray-950">
            차량 관리
          </Box>

          <Box marginTop={16} className="bg-white rounded-lg">
            <VehicleFilterBar onCreateClick={() => setRegisterOpen(true)} />
            <Box paddingX={24} paddingY={16}>
              <VehicleTable
                rows={VEHICLE_ROWS}
                totalCount={VEHICLE_TOTAL_COUNT}
                onExcelDownload={() => {
                  /* 엑셀 다운로드는 Default 툴바에 내장 */
                }}
                onVinClick={setEditRow}
              />
            </Box>
            <Box paddingX={24} paddingY={16}>
              <Stack direction="row" align="center" justify="end">
                <Pagination
                  currentPage={currentPage}
                  totalPages={TOTAL_PAGES}
                  totalItems={VEHICLE_TOTAL_COUNT}
                  pageSize={LIST_PAGE_SIZE}
                  onChange={setCurrentPage}
                />
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>

      <VehicleEditModal
        open={!!editRow}
        row={editRow}
        onClose={() => setEditRow(null)}
        onOpenLocation={setLocationRow}
      />
      <VehicleRegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
      <VehicleLocationModal
        open={!!locationRow}
        row={locationRow}
        onClose={() => setLocationRow(null)}
      />
    </AdminShell>
  );
}
