import React, { useContext, useEffect, useMemo, useState } from 'react';

import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  Row,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';

import style from './PartnersList.style';
import { vendorType } from './PartnersList.type';

import { Loader, Text } from '@/components';
import { companyName } from '@/helpers/companyNameTranslation';
import useTranslation from '@/hooks/useTranslate';
import { Context } from '@/providers/MainContext';
import { getVendorsList } from '@/services/vendors';
import FontSizes from '@/styles/themes/brand/fontSizes';

const PartnersList = () => {
  const { t } = useTranslation();
  const [vendors, setVendors] = useState<vendorType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const { locale } = useContext(Context);
  const rerender = React.useReducer(() => ({}), {})[1];

  useEffect(() => {
    setVendors([]);
    setIsEnd(false);
    setPage(1);
    getListOfVendors(1);
  }, [window.location.search]);

  useEffect(() => {
    setIsEnd(false);
    setPage(1);
    setVendors([]);
    getListOfVendors(1);
  }, [locale]);

  const handleNextPage = () => {
    setPage(prev => prev + 1);
    getListOfVendors(page + 1);
  };

  const getListOfVendors = async (_page = 1) => {
    setLoading(true);
    const queryParams = new URLSearchParams(window.location.search);
    const vendors_data = await getVendorsList(
      queryParams,
      _page,
      10,
      '',
      locale
    );
    const new_data = vendors_data.data.data;
    if (_page === 1) {
      setVendors(new_data);
    } else {
      setVendors(prev => {
        const total = vendors_data.data.meta.total;
        if (total <= prev.length + new_data.length) {
          setIsEnd(true);
        }
        return [...prev, ...new_data];
      });
    }
    setLoading(false);
    rerender();
  };

  const columnHelper = createColumnHelper<vendorType>();
  const columns = [
    columnHelper.accessor('companyName', {
      cell: info => {
        return !info.row.original.is_alphabetical ? (
          companyName(info.row.original, locale)
        ) : (
          <Text fontWeight={'bold'} fontSize={FontSizes.medium}>
            {info.getValue()}
          </Text>
        );
      },
      header: t('vendors_table_company_name'),
    }),
    columnHelper.accessor('type', {
      cell: info =>
        !info.row.original.is_alphabetical &&
        (locale == 'en' ? info.getValue() : info.row.original.typeAr),
      header: t('vendors_table_type'),
    }),
    columnHelper.accessor('location', {
      cell: info =>
        !info.row.original.is_alphabetical &&
        (locale == 'en'
          ? info.getValue() || '-'
          : info.row.original.locationAr || '-'),
      header: t('vendors_table_location'),
    }),
    columnHelper.accessor('completedProjects', {
      cell: info =>
        !info.row.original.is_alphabetical ? info.getValue() || '-' : '',
      header: t('vendors_table_completed_projects'),
    }),
    columnHelper.accessor('ongoingProjects', {
      cell: info =>
        !info.row.original.is_alphabetical ? info.getValue() || '-' : '',
      header: t('vendors_table_ongoing_projects'),
    }),
  ];
  const data = useMemo(() => {
    let group = '';
    const tmp_vendors = [...vendors];
    for (let i = 0; i < tmp_vendors.length; i++) {
      const name_field = locale === 'en' ? 'companyName' : 'companyNameAr';
      const name = tmp_vendors[i][name_field]
        ? tmp_vendors[i][name_field][0]?.toUpperCase()
        : '-';

      if (name !== group) {
        group = name;
        const object: vendorType = {
          companyName: group,
          companyNameAr: '',
          cityName: '',
          completedProjects: 0,
          id: '',
          contactPhoneNumber: '',
          location: '',
          locationAr: '',
          ongoingProjects: 0,
          established: '',
          numberOfStaff: 0,
          type: '',
          typeAr: '',
          is_alphabetical: true,
        };
        tmp_vendors.splice(i, 0, object);
      }
    }
    return tmp_vendors;
  }, [vendors, locale]);
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const tableContainerRef = React.useRef<any>();

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <Flex __css={style.root}>
      <TableContainer
        ref={tableContainerRef}
        w={'100%'}
        minH={'300px'}
        position={'relative'}
      >
        <Table sx={style.table} w={'100%'} variant="unstyled">
          <Thead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <Box as="th" key={header.id}>
                    <Text
                      sx={{
                        whiteSpace: 'normal',
                      }}
                      as="span"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Text>
                  </Box>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow: any) => {
              const row = rows[virtualRow.index] as Row<vendorType>;
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell: any) => (
                    <Td pb={'20px'} key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {loading && vendors.length === 0 && (
        <Box sx={style.spinner}>
          <Loader thickness="3px" size={'xl'} />
          <Text fontSize="18px">{t('loading_state')}</Text>
        </Box>
      )}
      {!loading && vendors.length === 0 && (
        <Box sx={style.spinner}>
          <Text fontSize="18px">{t('no_data_found')}</Text>
        </Box>
      )}
      {!isEnd && vendors.length > 0 && (
        <Flex mt="20px" w="100%" justifyContent="center">
          <Button
            isLoading={loading && vendors.length > 0}
            onClick={handleNextPage}
            variant={'secondary'}
          >
            {t('load_more')}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default PartnersList;
