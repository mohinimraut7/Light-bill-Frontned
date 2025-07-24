
ConsumerBill.js
-------------------------------
const [page, setPage] = useState(0); // MUI is zero-indexed
const [pageSize, setPageSize] = useState(10);

-------------

  const { bills, loading, error } = useSelector((state) => state.bills);
  ---------------------------------

  useEffect(() => {
    dispatch(fetchBills({ page, pageSize }));
  }, [dispatch, page, pageSize]);
  -------------------
  <StyledDataGrid
  rows={bills}
  columns={columns(handleDeleteBill, handleEditBill)}
  paginationMode="server"
  rowCount={totalCount} // you'll pass this from Redux or props
  page={page}
  pageSize={pageSize}
  onPageChange={(newPage) => setPage(newPage)}
  onPageSizeChange={(newPageSize) => {
    setPageSize(newPageSize);
    setPage(0); // Reset to first page on pageSize change
  }}
  getRowId={(row) => row._id}
  loading={loading}
  initialState={{
    pagination: {
      paginationModel: { page: 0, pageSize: 10 },
    },
  }}
  pageSizeOptions={[5, 10, 15, 25, 35, 45, 55, 100]}
  sx={{ paddingRight: 0.5, paddingLeft: 0.5 }}
/>

=======================
billActions.js
----------------------
export const fetchBills = (page = 0, pageSize = 10) => {
  return async (dispatch) => {
    dispatch(fetchBillsRequest());
    try {
      const response = await axios.get(`${baseUrl}/getBills`, {
        params: { page, pageSize }
      });

      // Response: { bills: [...], totalCount: number }
      dispatch(fetchBillsSuccess(response.data));
    } catch (error) {
      dispatch(fetchBillsFailure(error.message));
    }
  };
};
=================================
billReducer.js 
---------------------

const initialState = {
    bills: [],
    loading: false,
    error: null,
    totalCount: 0  // ✅ Add this
  };
  ------------------
   case FETCH_BILLS_SUCCESS:
          return {
            ...state,
            loading: false,
            bills: action.payload,
            totalCount: action.payload.totalCount || 0, // ✅ Add this
          };

=======================================================================
// Backend controller function
exports.getBills = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0; // frontend 0-indexed
    const pageSize = parseInt(req.query.pageSize) || 10;

    const bills = await Bill.find()
      .skip(page * pageSize)
      .limit(pageSize)
      .lean();

    const totalCount = await Bill.countDocuments();

    res.status(200).json({ bills, totalCount });
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};