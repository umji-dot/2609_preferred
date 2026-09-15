import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Pagination } from 'fms-staff-design-system';
import { AdminShell } from '../components/AdminShell';
import { CarCodeFilterBar } from '../features/car-code/components/CarCodeFilterBar';
import { CarCodeTable } from '../features/car-code/components/CarCodeTable';
import { CarCodeRegisterModal } from '../features/car-code/components/CarCodeRegisterModal';
import { CarCodeEditModal } from '../features/car-code/components/CarCodeEditModal';
import type { CarCodeRow } from '../features/car-code/mocks';
import {
  CAR_CODE_ROWS,
  CAR_CODE_TOTAL_COUNT,
} from '../features/car-code/mocks';
import { LIST_PAGE_SIZE } from '../components/ui-rules';

const TOTAL_PAGES = Math.ceil(CAR_CODE_TOTAL_COUNT / LIST_PAGE_SIZE);

export default function CarCodeListPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [editRow, setEditRow] = useState<CarCodeRow | null>(null);

  return (
    <AdminShell>
      <Box padding={24}>
        <Stack direction="column">
          <Box as="h1" className="text-page-title text-gray-950">
            카코드 관리
          </Box>

          <Box marginTop={16} className="bg-white rounded-lg">
            <CarCodeFilterBar onCreateClick={() => setRegisterOpen(true)} />
            <Box paddingX={24} paddingY={16}>
              <CarCodeTable
                rows={CAR_CODE_ROWS}
                totalCount={CAR_CODE_TOTAL_COUNT}
                onExcelDownload={() => {
                  /* 엑셀 다운로드는 Default 툴바에 내장 (인터랙션 데모) */
                }}
                onCodeClick={setEditRow}
                onVehicleCountClick={() => navigate('/vehicles')}
              />
            </Box>
            <Box paddingX={24} paddingY={16}>
              <Stack direction="row" align="center" justify="end">
                <Pagination
                  currentPage={currentPage}
                  totalPages={TOTAL_PAGES}
                  totalItems={CAR_CODE_TOTAL_COUNT}
                  pageSize={LIST_PAGE_SIZE}
                  onChange={setCurrentPage}
                />
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>

      <CarCodeRegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
      <CarCodeEditModal
        open={!!editRow}
        row={editRow}
        onClose={() => setEditRow(null)}
      />
    </AdminShell>
  );
}
