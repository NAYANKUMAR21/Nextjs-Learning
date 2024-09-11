# def longestOnes(nums, k):
#     left = 0
#     zero_count = 0
#     max_len = 0

# k = 2
# zc = 3
# 1 1  0 0 0 1
#              r

#     for right in range(len(nums)):
#         # If we encounter a 0, increment zero_count
#         if nums[right] == 0:
#             zero_count += 1
        
#         # If zero_count exceeds k, move the left pointer to reduce zero_count
#         while zero_count > k:
#             if nums[left] == 0:
#                 zero_count -= 1
#             left += 1
        
#         # Calculate the maximum length of the window
#         max_len = max(max_len, right - left + 1)

#     return max_len
