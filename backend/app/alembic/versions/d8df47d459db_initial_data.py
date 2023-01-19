"""initial data

Revision ID: d8df47d459db
Revises: d9817f55c0ec
Create Date: 2023-01-05 01:09:11.166980-08:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd8df47d459db'
down_revision = 'd9817f55c0ec'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('branch',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('contact', sa.Integer(), nullable=True),
    sa.Column('location', sa.String(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('type', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_branch_id'), 'branch', ['id'], unique=False)
    op.create_table('course',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_course_id'), 'course', ['id'], unique=False)
    op.create_index(op.f('ix_course_title'), 'course', ['title'], unique=True)
    op.create_table('program',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_program_id'), 'program', ['id'], unique=False)
    op.create_index(op.f('ix_program_title'), 'program', ['title'], unique=True)
    op.create_table('quiz',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('content', sa.String(), nullable=True),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_quiz_id'), 'quiz', ['id'], unique=False)
    op.create_index(op.f('ix_quiz_title'), 'quiz', ['title'], unique=True)
    op.create_table('branch_program',
    sa.Column('branch_id', sa.Integer(), nullable=False),
    sa.Column('program_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['branch_id'], ['branch.id'], ),
    sa.ForeignKeyConstraint(['program_id'], ['program.id'], ),
    sa.PrimaryKeyConstraint('branch_id', 'program_id')
    )
    op.create_table('company_branch',
    sa.Column('company_id', sa.Integer(), nullable=False),
    sa.Column('brnach_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['brnach_id'], ['branch.id'], ),
    sa.ForeignKeyConstraint(['company_id'], ['company.id'], ),
    sa.PrimaryKeyConstraint('company_id', 'brnach_id')
    )
    op.create_table('course_quiz',
    sa.Column('course_id', sa.Integer(), nullable=False),
    sa.Column('quiz_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['course_id'], ['course.id'], ),
    sa.ForeignKeyConstraint(['quiz_id'], ['quiz.id'], ),
    sa.PrimaryKeyConstraint('course_id', 'quiz_id')
    )
    op.create_table('program_course',
    sa.Column('program_id', sa.Integer(), nullable=False),
    sa.Column('course_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['course_id'], ['course.id'], ),
    sa.ForeignKeyConstraint(['program_id'], ['program.id'], ),
    sa.PrimaryKeyConstraint('program_id', 'course_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('program_course')
    op.drop_table('course_quiz')
    op.drop_table('company_branch')
    op.drop_table('branch_program')
    op.drop_index(op.f('ix_quiz_title'), table_name='quiz')
    op.drop_index(op.f('ix_quiz_id'), table_name='quiz')
    op.drop_table('quiz')
    op.drop_index(op.f('ix_program_title'), table_name='program')
    op.drop_index(op.f('ix_program_id'), table_name='program')
    op.drop_table('program')
    op.drop_index(op.f('ix_course_title'), table_name='course')
    op.drop_index(op.f('ix_course_id'), table_name='course')
    op.drop_table('course')
    op.drop_index(op.f('ix_branch_id'), table_name='branch')
    op.drop_table('branch')
    # ### end Alembic commands ###
