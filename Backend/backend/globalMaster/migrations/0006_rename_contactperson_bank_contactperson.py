# Generated by Django 4.1.2 on 2022-11-03 04:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('globalMaster', '0005_bank_address_bank_branch_bank_contactperson_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bank',
            old_name='contactperson',
            new_name='contactPerson',
        ),
    ]
