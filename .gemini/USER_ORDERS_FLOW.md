# Complete User Orders Flow

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        User Management Page                          │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    Stats Cards (Top)                          │  │
│  │  • Total Users  • New This Week  • Average Orders            │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │               Conditional View (selectedUser state)           │  │
│  │                                                               │  │
│  │  IF selectedUser === null:                                   │  │
│  │  ┌─────────────────────────────────────────────────────────┐ │  │
│  │  │               UserList Component                        │ │  │
│  │  │  • Shows all users in a table                          │ │  │
│  │  │  • Eye icon → calls onViewUser(user)                   │ │  │
│  │  │  • Gift icon → opens gift modal                        │ │  │
│  │  └─────────────────────────────────────────────────────────┘ │  │
│  │                                                               │  │
│  │  IF selectedUser !== null:                                   │  │
│  │  ┌─────────────────────────────────────────────────────────┐ │  │
│  │  │         GetUserOrdersDetail Component                   │ │  │
│  │  │                                                         │ │  │
│  │  │  1. Back Button → calls onBack()                       │ │  │
│  │  │  2. Customer Info Card:                                │ │  │
│  │  │     • Avatar with initials                             │ │  │
│  │  │     • Name, Email                                      │ │  │
│  │  │     • Location, Joined Date                            │ │  │
│  │  │     • Total Spent (calculated from API data)           │ │  │
│  │  │                                                         │ │  │
│  │  │  3. Tabs:                                              │ │  │
│  │  │     [Ongoing Orders] [Completed] [Addresses] [Gifts]   │ │  │
│  │  │                                                         │ │  │
│  │  │  4. Orders List:                                       │ │  │
│  │  │     • Each order shows:                                │ │  │
│  │  │       - Avatar | Order #XXX | Date                     │ │  │
│  │  │       - Status Badge | Amount | Arrow                  │ │  │
│  │  │     • Click order → Navigate to CustomerDetail         │ │  │
│  │  └─────────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌─────────────────┐
│   User clicks   │
│   Eye Icon on   │
│   UserList      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  onViewUser(item) called        │
│  • item contains:               │
│    - userId                     │
│    - name, email                │
│    - location, date             │
│    - orders, spent              │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  UserManagement updates state:  │
│  setSelectedUser(item)          │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│  GetUserOrdersDetail renders with:                  │
│  • selectedUser prop                                │
│  • onBack prop                                      │
└────────┬────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│  API Call: useGetUserOrdersQuery(selectedUser.userId)│
│                                                      │
│  GET /api/v1/admin/users/{userId}                   │
│  • Credentials: include (cookies)                   │
│  • Skip if no userId                                │
└────────┬─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│  Backend Response:                                   │
│  {                                                   │
│    orders: [                                         │
│      {                                               │
│        _id, userId, totalAmount,                     │
│        Status, createdAt, ...                        │
│      }                                               │
│    ]                                                 │
│  }                                                   │
└────────┬─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│  Component displays orders:                          │
│  • Maps through userOrders array                     │
│  • Calculates totalSpent                             │
│  • Shows each order card                             │
└────────┬─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│  User clicks on an order                             │
│  handleOrderClick(orderId) called                    │
└────────┬─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────┐
│  Navigation:                                         │
│  navigate(`/customerdetail/${orderId}`)             │
│                                                      │
│  → CustomerDetail page opens                         │
└──────────────────────────────────────────────────────┘
```

## API Integration Details

### Redux API Structure

```javascript
// src/Redux/Apis/usersApi.js

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/admin`,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        
        // Existing endpoint
        getUsers: builder.query({
            query: () => ({
                url: "/users",
                method: "GET"
            }),
            providesTags: ["user"]
        }),

        // NEW ENDPOINT
        getUserOrders: builder.query({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "GET"
            }),
            providesTags: ["user"]
        }),
    })
})

export const { 
    useGetUsersQuery, 
    useGetUserOrdersQuery  // ← New hook
} = usersApi
```

### Component Usage

```javascript
// src/admin/pages/GetUserOrdersDetail.jsx

const GetUserOrdersDetail = ({ selectedUser, onBack }) => {
    // API call with skip logic
    const { data, isLoading, isError } = useGetUserOrdersQuery(
        selectedUser?.userId, 
        {
            skip: !selectedUser?.userId
        }
    );

    // Extract orders from response
    const userOrders = data?.orders || [];

    // Calculate total
    const totalSpent = userOrders.reduce(
        (sum, order) => sum + (order.totalAmount || 0), 
        0
    );

    // Handle order click
    const handleOrderClick = (orderId) => {
        navigate(`/customerdetail/${orderId}`);
    };

    // Render UI...
}
```

## State Management in UserManagement

```javascript
// src/admin/pages/UserManagement.jsx

const UserManagement = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div>
            {/* Stats Cards */}
            <StatsSection />

            {/* Conditional Rendering */}
            {selectedUser ? (
                <GetUserOrdersDetail 
                    selectedUser={selectedUser} 
                    onBack={() => setSelectedUser(null)} 
                />
            ) : (
                <UserList 
                    onViewUser={(user) => setSelectedUser(user)} 
                />
            )}
        </div>
    );
}
```

## Complete User Journey

1. **User Management Page Loads**
   - Shows stats cards at top
   - Shows UserList table below
   - API: `GET /admin/users` (fetches all users)

2. **User Clicks Eye Icon**
   - `onViewUser(item)` called with user data
   - `selectedUser` state updates
   - View switches to GetUserOrdersDetail

3. **GetUserOrdersDetail Loads**
   - Shows customer info card
   - API: `GET /admin/users/{userId}` (fetches user's orders)
   - Displays orders list
   - Calculates and shows total spent

4. **User Clicks "Back to Users"**
   - `onBack()` called
   - `selectedUser` set to null
   - View switches back to UserList

5. **User Clicks on an Order**
   - `handleOrderClick(orderId)` called
   - Navigates to `/customerdetail/{orderId}`
   - CustomerDetail page loads with order details

## Key Features

✅ **In-Place View Switching**: No page navigation for viewing user orders
✅ **Optimized API Calls**: Only fetches orders for selected user
✅ **Error Handling**: Graceful error states with retry options
✅ **Loading States**: Smooth loading experience
✅ **Responsive Design**: Works on all screen sizes
✅ **Back Navigation**: Easy return to users list
✅ **Deep Linking**: Can navigate to specific order details
