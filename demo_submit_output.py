#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
演示：L2 执行任务并写入输出
"""

import sys
sys.path.insert(0, '.')

from scripts.collab_tools import (
    update_task_status,
    write_output,
    STATUS_PENDING_REVIEW
)

# 1. 写入输出
write_output(
    task_id="TASK_20260504_111141",
    output_files=[
        "研究文稿/07_书稿/AI协作卷/附录_L2产出_R2_P001_核心术语表v1.md"
    ],
    summary="已压缩术语表，从18个优化到15个核心词",
    uncertainties=["稳态窗口是否应保留为核心词？"],
    risks=["可能丢失部分边缘信息"],
    needs_review=True
)

# 2. 更新任务状态为待复核
update_task_status("TASK_20260504_111141", STATUS_PENDING_REVIEW)
