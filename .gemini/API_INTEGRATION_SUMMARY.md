# API Integration Summary - Get User Orders by User ID

## Overview
Integrated the backend API endpoint to fetch orders for a specific user by their user ID.

## API Endpoint Details
- **URL Pattern**: `/api/v1/admin/users/{userId}`
- **Method**: `GET`
- **Base URL**: From environment variable `VITE_BASE_URL`
- **Authentication**: Credentials included (cookies)

## Changes Made

### 1. Updated `usersApi.js`
**File**: `src/Redux/Apis/usersApi.js`

#### Added New Endpoint: `getUserOrders`
```javascript
getUserOrders: builder.query({
    query: (userId) => {
        return {
            url: `/users/${userId}`,
            method: "GET"
        }
    },
    providesTags: ["user"]
}),
```

#### Exported New Hook
```javascript
export const { useGetUsersQuery, useGetUserOrdersQuery } = usersApi
```

### 2. Updated `GetUserOrdersDetail.jsx`
**File**: `src/admin/pages/GetUserOrdersDetail.jsx`

#### Changes:
1. **Replaced API Import**:
   - Old: `import { useGetOdersQuery } from '../../Redux/Apis/OrdersApi'`
   - New: `import { useGetUserOrdersQuery } from '../../Redux/Apis/usersApi'`

2. **Updated Data Fetching Logic**:
   ```javascript
   // Before: Fetched all orders and filtered client-side
   const { data, isLoading } = useGetOdersQuery();
   const userOrders = data?.orders?.filter(order => order.userId?._id === selectedUser?.userId) || [];

   // After: Fetches orders directly for the specific user from backend
   const { data, isLoading, isError } = useGetUserOrdersQuery(selectedUser?.userId, {
       skip: !selectedUser?.userId
   });
   const userOrders = data?.orders || [];
   ```

3. **Added Error Handling**:
   - Added `isError` state check
   - Shows error message with back button if API call fails
   - Provides better user experience with error feedback

## Benefits

### Performance Improvements
- ✅ **Reduced Data Transfer**: Only fetches orders for the specific user instead of all orders
- ✅ **Faster Loading**: No client-side filtering needed
- ✅ **Better Scalability**: Backend handles the filtering efficiently

### Code Quality
- ✅ **Error Handling**: Proper error states and user feedback
- ✅ **API Separation**: User orders endpoint logically placed in `usersApi`
- ✅ **Skip Logic**: Query only runs when user is selected (prevents unnecessary API calls)

## Testing the Integration

### Test Steps:
1. Navigate to User Management page
2. Click the eye icon on any user in the table
3. Verify that the GetUserOrdersDetail component loads
4. Check that orders are fetched from the API endpoint: `/api/v1/admin/users/{userId}`
5. Verify total spent is calculated correctly
6. Click on an order to navigate to Customer Details

### Expected API Response Format:
```json
{
  "orders": [
    {
      "_id": "string",
      "userId": {
        "_id": "string",
        "name": "string",
        "email": "string"
      },
      "totalAmount": number,
      "Status": "string",
      "createdAt": "string"
    }
  ]
}
```

## Notes
- The API automatically handles authentication via cookies
- The `skip` option prevents the query from running when no user is selected
- Error states are properly handled with user-friendly messages
- Total spent is calculated on the frontend from the filtered orders
