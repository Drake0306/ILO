# Generated by Django 4.1.2 on 2022-11-06 06:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='permission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('permissionSet', models.CharField(blank=True, max_length=350, null=True)),
                ('status', models.CharField(default='true', max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='user',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('email', models.CharField(blank=True, max_length=250, null=True)),
                ('password', models.CharField(blank=True, max_length=250, null=True)),
                ('phone', models.CharField(blank=True, max_length=250, null=True)),
                ('pic', models.CharField(blank=True, max_length=250, null=True)),
                ('org', models.CharField(blank=True, max_length=250, null=True)),
                ('branch', models.CharField(blank=True, max_length=250, null=True)),
                ('permission', models.CharField(blank=True, max_length=250, null=True)),
                ('status', models.CharField(default='true', max_length=250)),
            ],
        ),
    ]
