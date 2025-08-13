var longestCommonSubsequence = function (text1, text2) {
    // 公共子序列，是可以jump的
    // dp[i][j] 是t1[0,i]和t2[0,j] 部分的最长公共子序列长度

    const dp = new Array(text1.length).fill(0).map(_ => new Array(text2.length).fill(0))

    for (let i = 0; i < text1.length; i++) {
        if (text1[i] === text2[0])
            dp[i][0] = 1
    }
    for (let j = 0; j < text2.length; j++) {
        if (text2[j] === text1[0]) {
            dp[0][j] = 1
        }
    }

    for (let i = 1; i < text1.length; i++) {

        for (let j = 1; j < text2.length; j++) {

            if (text1[i] != text2[j]) {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            } else {
                dp[i][j] = dp[i - 1][j - 1] + 1
            }
        }
    }

    return dp[text1.length - 1][text2.length - 1]
};

const res = longestCommonSubsequence("abcde", "ace")